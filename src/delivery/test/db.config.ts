import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const createTestConfig = (entities: any[]): TypeOrmModuleOptions => ({
  type: (process.env.ITOLL_DB_TYPE || 'postgres') as any,
  host: process.env.ITOLL_DB_HOST || 'localhost',
  port: parseInt(process.env.ITOLL_DB_PORT) || 5432,
  username: process.env.ITOLL_DB_USERNAME || 'itoll',
  password: process.env.ITOLL_DB_PASSWORD || 'itoll',
  database: process.env.ITOLL_DB || 'itoll',
  namingStrategy: new SnakeNamingStrategy(),
  entities,
  migrations: ['dist/db/migrations/*{.ts,.js}'],
});
