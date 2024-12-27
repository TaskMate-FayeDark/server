import express, { Application } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import SwaggerUI from "swagger-ui-express";
import sequelize from "./config/config";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import boardRouter from "./routes/boards";
import listsRouter from "./routes/lists";
import assignedRouter from "./routes/assigned";
import cors from "cors";

dotenv.config();
const app: Application = express();
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const PORT = process.env.PORT || 8081;
app.use(express.json());

// Setup Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TaskMate API",
      version: "1.0.0",
      description: "API documentation with Swagger and TypeScript",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));
app.use("/auth", authRouter);
app.use("/boards", boardRouter);
app.use("/lists", listsRouter);
app.use("/assigned", assignedRouter);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api`);
  });
});
