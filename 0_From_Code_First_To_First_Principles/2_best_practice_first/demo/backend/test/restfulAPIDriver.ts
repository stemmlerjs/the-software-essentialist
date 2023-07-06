const request = require("supertest");
import { Server } from "http";

export class RESTfulAPIDriver {
  constructor(private baseUrl: string, private http: Server) {}

  post(url: string, data: any) {
    return request(this.http)
      .post(url)
      .send(data)
      .set("Accept", "application/json")
  }
}
