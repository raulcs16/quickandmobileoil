import express, { Application, Request, Response } from "express";
import { onRequest } from "../../packages/firebase/admin";
import cors from "cors";
import { container } from "./container";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express + Firebase!");
});
app.post("/oil-form", (req, res) =>
  container.oilServiceController.processOilRequest(req, res)
);

const PORT = process.env.PORT || 8001;

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(
      `🚀 Standalone Express server running locally at http://localhost:${PORT}`
    );
  });
}

export const api = onRequest({ cors: true, invoker: "public" }, app);
