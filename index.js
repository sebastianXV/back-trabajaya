require('dotenv').config();

const express = require('express');
const http = require('http');
const authRoutes = require('./routes/authRoutes');

const app = express(); 

const PORT = process.env.PORT || 3006;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  next();
});

app.use('/api', authRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
