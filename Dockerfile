FROM pnpm/pnpm:latest

# 设置工作目录
WORKDIR /app

# 将当前目录的package.json和package-lock.json文件复制到镜像中
COPY package*.json ./

# 安装项目依赖
RUN pnpm install

# 构建项目
RUN pnpm run build

# 将当前目录的所有文件复制到镜像中
COPY . .

EXPOSE 3000

# 启动应用程序
CMD [ "npm", "start" ]