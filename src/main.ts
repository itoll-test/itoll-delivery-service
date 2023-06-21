import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages:
        configService.get('env') === 'production' ? true : false,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Delivery API')
    .setDescription(
      'For Using APIs, first login to delivery as business{username=bussiness,password=itoll} \
      or courier {username=courier,password=itoll} then use generated token in other APIs',
    )
    .setVersion('0.0.1')
    .addTag('Auth')
    .addTag('Delivery')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    customSiteTitle: 'Delivery API v1 Document',
  });

  await app.listen(configService.get('port'), configService.get('bindIP'));
}
bootstrap();
