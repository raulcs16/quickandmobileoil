import express, { Application, Request, Response } from "express";
import { admin, onRequest } from "../../packages/firebase/admin";

const app: Application = express();
app.use(express.json());

// Your standard routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

// Example leveraging the clean pass-through admin export
app.get("/health", async (req: Request, res: Response) => {
  try {
    const collections = await admin.firestore().listCollections();
    res.json({ status: "healthy", collectionsCount: collections.length });
  } catch (error) {
    res.status(500).json({ error: "Database unreachable" });
  }
});

// Pass your app straight into the onRequest function you just exported
export const api = onRequest({ cors: true }, app);
