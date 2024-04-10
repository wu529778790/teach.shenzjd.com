import puppeteer from "puppeteer";
import genericPool from "generic-pool";

/**
 * Creates a Puppeteer pool with specified configurations.
 *
 * @param {Object} options - Object containing pool configurations.
 * @param {number} options.max - pool 的最大容量
 * @param {number} options.min - pool 的最小容量
 * @param {number} options.idleTimeoutMillis - 连接在池中保持空闲而不被回收的最小时间值
 * @param {number} options.maxUses - 最大使用数
 * @param {boolean} options.testOnBorrow - 在连接池交付实例前是否先经过 factory.validate 测试
 * @param {Object} options.puppeteerArgs - Arguments for launching Puppeteer instances.
 * @param {Function} options.validator - Function to validate the instance.
 * @param {Object} options.otherConfig - Additional configurations.
 * @return {Object} A pool of Puppeteer instances.
 */
const createPuppeteerPool = ({
  max = 10,
  min = 1,
  idleTimeoutMillis = 30000,
  maxUses = 50,
  testOnBorrow = true,
  puppeteerArgs = {},
  validator = () => Promise.resolve(true),
  ...otherConfig
} = {}) => {
  const factory = {
    // 创建实例
    create: () =>
      puppeteer.launch(puppeteerArgs).then((instance) => {
        instance.useCount = 0;
        return instance;
      }),
    // 销毁实例
    destroy: (instance) => {
      instance.close();
    },
    // 验证实例可用性
    validate: (instance) => {
      return validator(instance).then((valid) =>
        // maxUses 小于 0 或者 instance 使用计数小于 maxUses 时可用
        Promise.resolve(valid && (maxUses <= 0 || instance.useCount < maxUses))
      );
    },
  };
  const config = {
    max,
    min,
    idleTimeoutMillis,
    testOnBorrow,
    ...otherConfig,
  };
  // 创建连接池
  const pool = genericPool.createPool(factory, config);
  const genericAcquire = pool.acquire.bind(pool);
  // 池中资源连接时进行的操作
  pool.acquire = () =>
    genericAcquire().then((instance) => {
      instance.useCount += 1;
      return instance;
    });
  pool.use = (fn) => {
    let resource;
    return pool
      .acquire()
      .then((r) => {
        resource = r;
        return r;
      })
      .then(fn)
      .then(
        (result) => {
          // 释放资源
          pool.release(resource);
          return result;
        },
        (err) => {
          pool.release(resource);
          throw err;
        }
      );
  };
  return pool;
};

export default createPuppeteerPool;
