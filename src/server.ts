import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error";
import config from "./config";

const port = config.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
