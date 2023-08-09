import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(bodyParser.json());
app.use(routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err });
});

export default app;
