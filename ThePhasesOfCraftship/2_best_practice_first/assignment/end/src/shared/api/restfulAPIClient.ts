import axios from "axios";

export class RESTfulAPIClient {
  post(url: string, data: any) {
    return axios({
      baseURL: "http://localhost:3000",
      method: "post",
      url,
      data,
    });
  }
}
