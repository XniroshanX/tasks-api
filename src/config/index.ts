import * as dotenv from "dotenv";

dotenv.config();

type Config = {
  PORT: string;
};

const config: Config = {
  PORT: process.env.PORT ?? "default_secret",
};

export default config;
