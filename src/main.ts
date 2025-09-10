// server.js  -- Entry point to the application.
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './utils/loggerModule/logger.interceptor';
import { validateEnvVariables } from './utils/env.validator';
import { config } from 'dotenv';
config();
validateEnvVariables();
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
  });
  const logger = new Logger();

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-api-version',
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('Application API')
    .setDescription('api for Application functionality')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Enter a JWT token to authorize the requests...',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWTBearerAuth',
    )
    .addGlobalParameters(
      {
        name: 'language',
        in: 'header',
        required: true,
        description: 'language is required',
        allowEmptyValue: false,
        // example: 'en',
        schema: { type: 'string', default: 'en' },
      },
      {
        name: 'x-api-version',
        in: 'header',
        required: true,
        description: 'api version is required',
        allowEmptyValue: false,
        // example: '1',
        schema: { type: 'string', default: '1' },
      },
    )
    .addSecurityRequirements('JWTBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Start server
  await app.listen(process.env.PORT || 3000);
  logger.verbose('-------------------------------------');
  logger.log(
    'Swagger 🛠️  http://localhost:' +
      (process.env.PORT || 3000) +
      '/swagger 🛠️',
  );
  logger.verbose('-------------------------------------');
}
bootstrap();