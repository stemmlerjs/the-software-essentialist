import { Server } from "http";
import { app } from ".";

let server: Server;

export function startServer () {
  const port = process.env.PORT || 3000;

  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      resolve(undefined);
    });
  })
}

export function stopServer () {
  return new Promise((resolve, reject) => {
    if (!server) return reject('Server not started');
    server.close((err) => {
      if (err) return reject('Error stopping the server');
      return resolve('Server stopped');
    });
  })
}