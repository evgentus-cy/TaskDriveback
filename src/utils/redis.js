import redis from 'redis'
import {promisify} from 'util'

const redisHost = process.env.REDIS_HOST || '127.0.0.1';
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({host: redisHost, port: redisPort});

const incrAsync = promisify(redisClient.incr).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

export default {
  incrAsync,
  expireAsync
}