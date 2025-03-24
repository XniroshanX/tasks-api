import * as dotenv from "dotenv";

// Load environment variables from a .env file into process.env
dotenv.config();

// Define a TypeScript type for the configuration object
type Config = {
  PORT: string;
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
};

const config: Config = {
  PORT: process.env.PORT ?? "default_secret",
  AWS_REGION: process.env.AWS_REGION ?? "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? "",
};

export default config;
