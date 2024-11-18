import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import setupSwagger from './docs/index.js';

// Import Routes
import userRoutes from './routes/userRoute.js';
import taskRoutes from './routes/taskRoute.js';

// // Helper to resolve __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load Swagger YAML files
// // const swaggerDocument = YAML.load(path.join(__dirname, './docs/index.yaml'));
// const componentsSwagger = YAML.load(path.join(__dirname, './docs/components/schemas.yaml'));
// const usersSwagger = YAML.load(path.join(__dirname, './docs/paths/users.yaml'));
// const tasksSwagger = YAML.load(path.join(__dirname, './docs/paths/tasks.yaml'));
// console.log('users => ', JSON.stringify(usersSwagger))
// console.log('task => ', JSON.stringify(tasksSwagger))
// console.log('componentsSwagger => ', JSON.stringify(componentsSwagger))
// // Combine Swagger specs
// const swaggerDocument = {
//     openapi: '3.0.0',
//     info: {
//         title: 'Modular API Documentation',
//         version: '1.0.0',
//     },
//     components: {
//         ...componentsSwagger
//     },
//     paths: {
//         ...usersSwagger.paths,
//         ...tasksSwagger.paths,
//     },
// };
// console.log('swagger doc ==> ', JSON.stringify(swaggerDocument))
const app = express();

// API routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

setupSwagger(app);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
    console.log('API Docs are available at http://localhost:3000/api-docs');
});
