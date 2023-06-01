import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ride Share API',
      version: '1.0.0',
      description: 'API documentation for the ride share application',
      contact: {
        name: 'Matthew Arofin'
      }
    }
  },
  apis: ['./api/*.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec;