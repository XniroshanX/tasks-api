# The Task API

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (22.0.0 recommended)

- Docker & Docker Compose

### Installation

You can run the application two different ways. One is `npm` and other way is using `docker`. Go to project directory and follow any method you like:

#### Running with Docker Compose

Build and start the application:

`docker-compose up --build`

Stop the application:

`docker-compose down`

#### Running with npm

You need to install dependencies:

`npm install`

Start the development server:

`npm run dev`

For production you first run:

`npm run build`

Then

`npm start`

### Tests

This app contains unit tests that was written by `Jest`. In the project directory run below command:

`npm run test`

### Environment Variables

You can simply rename the `.env.production` file to `.env`. It contains all the necessary env variables.

### Deploying the application in a serverless architecture

This application can make lambda serverless architecture by using aws-serverless-express, which allows Express to work in a Lambda-compatible format.

## Example

```
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error";
import config from "./config";
import taskRoute from "./routes/task";
import userRoute from "./routes/user";
import serverless from "@vendia/serverless-express";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoute);
app.use("/api/users", userRoute);

app.use(errorHandler);

export const handler = serverless({ app });
```
