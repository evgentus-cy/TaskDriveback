import express from 'express'
import redis from './utils/redis'

// Initial settings
const interval = 60; // One minute
const port = process.env.PORT || 3000;

const app = express();

// Check visit type
const isLocalIp = (ip) => {
  const firstOctet = ip.split('.')[0];
  return !!(firstOctet === '10' || firstOctet === '192')
};

// Incr PageViews
const incrView = async () => {
  try {
    const viewsCount = await redis.incrAsync('views');
    if (viewsCount === 1) {
      await redis.expireAsync('views', interval);
    }
    return viewsCount;
  } catch ({message}) {
    console.error(message)
  }
};

// Test endpoint
app.get('/', async (req, res) => {
  try {
    let {hostname} = req;

    const views = !isLocalIp(hostname) ? await incrView() : 0;

    return res.json({views});
  } catch ({message}) {
    return res.status(400).json({error: 1, message})
  }
});

// Route not found
app.use((req, res) => {
  return res.status(404).json({error: true, message: 'Route not found'})
});

// Start server
app.listen(port, () => {
  console.log(`Test app listening on port ${port}!`);
});