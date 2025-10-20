const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { connectDb } = require('./src/config/db');
const apiRoutes = require('./src/api/routes');

async function startServer() {
  await connectDb();
  const app = express();
  // Allow requests from Next.js dev server
  const corsOptions = {
      origin: "http://localhost:3000", // The origin of your frontend app
      methods: ["GET", "POST"],
      credentials: true // This is important for some setups
    };

  app.use(cors(corsOptions));
  app.use(express.json());
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow Socket.IO from Next.js
      methods: ["GET", "POST"]
    }
  });

  // Pass the io instance to the routes
  apiRoutes(app, io);

  // Serve the static files from the React app
  const frontendPath = path.join(__dirname, '../eva/dist');
  app.use(express.static(frontendPath));

  app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });

  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();