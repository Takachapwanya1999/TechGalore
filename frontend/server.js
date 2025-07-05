// Combined Express REST API + Socket.IO server for real-time order updates (ESM)
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
// REST endpoint to get all products
app.get('/products', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read db.json' });
    try {
      const db = JSON.parse(data);
      res.json(db.products || []);
    } catch {
      res.status(500).json({ error: 'Malformed db.json' });
    }
  });
});
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

// REST endpoint to get all orders
app.get('/orders', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read db.json' });
    try {
      const db = JSON.parse(data);
      res.json(db.orders || []);
    } catch {
      res.status(500).json({ error: 'Malformed db.json' });
    }
  });
});

// REST endpoint to update order status
app.patch('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read db.json' });
    let db;
    try {
      db = JSON.parse(data);
    } catch {
      return res.status(500).json({ error: 'Malformed db.json' });
    }
    const order = db.orders.find(o => o.id == orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.status = status;
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), err2 => {
      if (err2) return res.status(500).json({ error: 'Failed to write db.json' });
      io.emit('ordersUpdate', db.orders);
      res.json(order);
    });
  });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH']
  }
});

// Watch db.json for changes and emit updates to all clients
fs.watchFile(dbPath, { interval: 500 }, () => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (!err) {
      try {
        const db = JSON.parse(data);
        io.emit('ordersUpdate', db.orders);
      } catch (err) {
        console.error('Error parsing db.json in fs.watchFile:', err);
      }
    }
  });
});

io.on('connection', (socket) => {
  // Send current orders on connect
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (!err) {
      try {
        const db = JSON.parse(data);
        socket.emit('ordersUpdate', db.orders);
      } catch (err) {
        console.error('Error parsing db.json in io.on(connection):', err);
      }
    }
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Combined Express + Socket.IO server running on port ${PORT}`);
});
