import swaggerJsdoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
dotenv.config()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Humeka API',
      version: '1.0.0',
      description: 'Documentation for Humeka api',
    },
    servers: [
      {
        url: process.env.APP_URL,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerformat: 'JWT',
        },
      },
    },
  },
  apis: ['src/documentation/*'],
};


export default swaggerJsdoc(options)