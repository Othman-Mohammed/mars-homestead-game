import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV 
  });
});

// Serve static files from dist/public
const publicDir = path.join(__dirname, 'public');
console.log('📁 Serving static files from:', publicDir);
app.use(express.static(publicDir));

// Fallback to index.html for SPA
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  console.log('🌐 Serving index.html from:', indexPath);
  res.sendFile(indexPath);
});

// Start server
const port = parseInt(process.env.PORT || '3000', 10);
const host = '0.0.0.0';

const server = createServer(app);

server.listen(port, host, () => {
  console.log(`🚀 Mars Homestead server running on http://${host}:${port}`);
  console.log(`✅ Health check: http://${host}:${port}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (error) => {
  console.error('❌ Server error:', error);
});