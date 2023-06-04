import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ride Share API',
      version: '1.0.0',
      description: 'API documentation for the ride share application',
      contact: {
        name: 'Matthew Arofin',
        url: 'Http://www.mattola.pro'
      },
    },
    servers: [
      {
        url: 'http://localhost:1337/',
        description: 'Development server'
      }
    ]
  },
  apis: ['./api/*/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec;