const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Mars Homestead Test Server</h1>
    <p>Server is running on port ${port}</p>
    <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
    <p>Time: ${new Date().toISOString()}</p>
    <a href="/health">Check Health Endpoint</a>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: port,
    env: process.env.NODE_ENV || 'development'
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Test server running on http://0.0.0.0:${port}`);
});