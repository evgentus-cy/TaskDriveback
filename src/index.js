import express from 'express'

const app = express();

// Initial settings
const interval = 60*1000; // One minute
const port = process.env.PORT || 3000;

let views = {internal: 0, external: 0};

// Check visit type
const isLocalIp = (ip) => {
  const firstOctet = ip.split('.')[0];
  return !!( firstOctet === '10' || firstOctet === '192' )
};

// Reset pageviews
setInterval(() => {
  views = {internal: 0, external: 0};
}, interval);

// Test endpoint
app.get('/', (req, res) => {
  let {hostname} = req;

  isLocalIp(hostname) ? views.internal++ : views.external++ ;

  res.json(views);
});

// Start server
app.listen(port, () => {
  console.log(`Test app listening on port ${port}!`);
});