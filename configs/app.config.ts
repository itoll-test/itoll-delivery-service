import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

export default () => ({
  env: process.env.NODE_ENV || 'development',
  bindIP: process.env.ITOLL_BIND_IP || '0.0.0.0',
  port: parseInt(process.env.ITOLL_PORT, 10) || 3000,
  rabbitMQ: {
    url: process.env.ITOLL_RABBITMQ_URL || 'amqp://localhost:5672',
    deliveryQueue: process.env.ITOLL_RABBITMQ_QUEUE || 'itoll_delivery_queue',
  },
  typeORM: (): TypeOrmModuleOptions => ({
    ...dataSourceOptions,
    //TODO: thinkabout this
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
    logging: process.env.NODE_ENV === 'development' ? true : false,
  }),
  passport: (): JwtModuleOptions => ({
    secret: process.env.ITOLL_PASSPORT_SECRET || 'itoll_secret',
    signOptions: {
      expiresIn: process.env.ITOLL_PASSPORT_EXPIRATION_TIME || '10m',
    },
  }),
});
