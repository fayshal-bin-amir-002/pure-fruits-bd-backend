import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ["https://pure-fruits-bd.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1", router);

const getAController = async (req: Request, res: Response) => {
  res.send("Hello World! Pure friut is running...");
};

app.get("/", getAController);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
