export default () => ({
  env: process.env.NODE_ENV || 'development',
  bindIP: process.env.ITOLL_BIND_IP || '0.0.0.0',
  port: parseInt(process.env.ITOLL_PORT, 10) || 3000,
  rabbitMQ: {
    url: process.env.ITOLL_RABBITMQ_URL || 'amqp://localhost:5672',
    deliveryQueue: process.env.ITOLL_RABBITMQ_QUEUE || 'itoll_delivery_queue',
  },
  postqres: {
    username: process.env.ITOLL_POSTGRES_USERNAME || '',
    password: process.env.ITOLL_POSTGRES_PASSWORD || '',
    host: process.env.ITOLL_POSTGRES_HOST || '127.0.0.1',
    port: parseInt(process.env.ITOLL_POSTGRES_PORT, 10) || 27017,
    db: process.env.ITOLL_POSTGRES_DB || 'itoll',
  },
});
