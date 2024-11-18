import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';


async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());
      // Enable CORS, to give the frontend access to the API
      app.enableCors({
        origin: 'http://localhost:5173', // URL of the port frontend is running on
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
