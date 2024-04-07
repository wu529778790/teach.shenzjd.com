import axios from "axios";
import render from "./render.js";

function generatePoster(kwargs) {
  // Your existing logic for generating the poster here
  const htmlContent = render(this._syntax, this._templateContent, kwargs);
  console.log(htmlContent);
  const url = POSTER_MAN_HA_PROXIES[this._apiEnv.value];

  return axios
    .post(url, htmlContent, {
      headers: {
        "Content-Type": "text/plain",
      },
      timeout: 60000,
      params: this.config,
    })
    .then((response) => {
      if (!response.data) {
        throw new Error(
          "Failed to generate poster, got NOTHING from poster-man"
        );
      }

      return response.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

export default generatePoster;
