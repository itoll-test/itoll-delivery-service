import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DeliveryModule } from './delivery/delivery.module';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      validationSchema: Joi.object({
        env: Joi.string().valid('development', 'production', 'test'),
        port: Joi.number(),
        userPort: Joi.number(),
        rabbitMQ: Joi.object().keys({
          url: Joi.string().uri(),
          userQueue: Joi.string(),
        }),
        postgres: Joi.object().keys({
          username: Joi.string(),
          password: Joi.string(),
          address: Joi.string().required(),
          port: Joi.string().required(),
          db: Joi.string().required(),
        }),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    DeliveryModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('typeORM')(),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
