import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

const app: Application = express();
// const port = 3000

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Pure Blogs server..");
});

app.get("/api", (req: Request, res: Response) => {
  res.send("Entered API route. now add proper routes and request..\nLike : https://pure-blogs-server.vercel.app/api/....");
});

app.use(globalErrorHandler);


export default app;
