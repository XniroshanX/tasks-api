import express from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "./middlewares/error";

const port = 8000;
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
