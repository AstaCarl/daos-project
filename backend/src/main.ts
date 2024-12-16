import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Main function to bootstrap the application(start the application)
async function bootstrap() {
 // Create the application, from NestFactory using the AppModule
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS, to give the frontend access to the API
  app.enableCors({
    origin: 'http://localhost:5173', // URL of the port frontend is running on
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Methods allowed
    credentials: true,
  });

  // Start the application on port 3000
  await app.listen(3000);
}
// Call the main function to start the application
bootstrap();
