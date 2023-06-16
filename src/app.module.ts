import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeliveryModule } from './delivery/delivery.module';
import configuration from 'configs/configuration';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
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
  ],
})
export class AppModule {}
