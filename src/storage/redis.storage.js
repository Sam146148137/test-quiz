import { createClient } from 'redis';

const redis = createClient({ password: process.env.REDIS_PASSWORD });

redis.on('connect', () => {
  console.log('Client connected to Redis...');
});
redis.on('ready', () => {
  console.log('Redis ready to use');
});
redis.on('error', (err) => {
  console.error('Redis Client', err);
});
redis.on('end', () => {
  console.log('Redis disconnected successfully');
});

(() => redis.connect())();

module.exports = redis;
