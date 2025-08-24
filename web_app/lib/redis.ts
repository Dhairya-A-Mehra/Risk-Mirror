// web_app/lib/redis.ts
import Redis from 'ioredis';

let redis: Redis;

// This function uses a singleton pattern to ensure only one connection is made.
export const getRedisClient = (): Redis => {
  if (!redis) {
    if (!process.env.REDIS_URL) {
      throw new Error('REDIS_URL is not defined in the environment variables');
    }
    console.log("--- Connecting to Redis for caching ---");
    redis = new Redis(process.env.REDIS_URL);
  }
  return redis;
};