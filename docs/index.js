import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import merge from 'deepmerge'
import { fileURLToPath } from "url";

// Helper to resolve __dirname in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load component YAML files
const schemas = YAML.load(
  path.join(__dirname, "./components/schemas.components.yaml")
);
const responses = YAML.load(
  path.join(__dirname, "./components/responses.components.yaml")
);
const parameters = YAML.load(
  path.join(__dirname, "./components/parameters.components.yaml")
);
const securitySchemes = YAML.load(
  path.join(__dirname, "./components/securitySchemes.components.yaml")
);

// Merge components
const components = merge.all([schemas, responses, parameters, securitySchemes])
// Load path YAML files
const usersPaths = YAML.load(path.join(__dirname, "./paths/users.paths.yaml"));
const tasksPaths = YAML.load(path.join(__dirname, "./paths/tasks.paths.yaml"));
console.log('tasksPaths ==>  ', JSON.stringify(tasksPaths))
// Merge paths
const paths = merge.all([usersPaths.paths, tasksPaths.paths])
console.log('paths ==> ', JSON.stringify(paths))
// Final Swagger document
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Dynamic Swagger API Documentation",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components,
  paths
};

export default function setupSwagger(app) {
  // setup API doc
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
