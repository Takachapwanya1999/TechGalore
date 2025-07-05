const express = require('express');
const http = require('http');
const { Server: SocketIo } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new SocketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"]
  }
});

// Store user sessions and carts
const userSessions = new Map();
const userCarts = new Map();

app.use(cors());
app.use(express.json());

// Socket connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle cart synchronization
  socket.on('cart-sync', (cartData) => {
    userCarts.set(socket.id, cartData);
    console.log('Cart synced for user:', socket.id, cartData);
  });

  // Handle cart updates
  socket.on('cart-update', (updatedCart) => {
    userCarts.set(socket.id, updatedCart);
    console.log('Cart updated for user:', socket.id, updatedCart);
    
    // Broadcast to all connected clients (for real-time updates)
    socket.broadcast.emit('cart-updated', updatedCart);
  });

  // Handle user authentication
  socket.on('user-login', (userData) => {
    userSessions.set(socket.id, userData);
    console.log('User logged in:', socket.id, userData);
    
    // Broadcast user update
    socket.broadcast.emit('user-updated', userData);
  });

  // Handle user logout
  socket.on('user-logout', () => {
    userSessions.delete(socket.id);
    userCarts.delete(socket.id);
    console.log('User logged out:', socket.id);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    userSessions.delete(socket.id);
    userCarts.delete(socket.id);
  });
});

// API endpoints for cart management
app.get('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;
  const cart = userCarts.get(userId) || [];
  res.json(cart);
});

app.post('/api/cart/:userId', (req, res) => {
  const { userId } = req.params;
  const { cart } = req.body;
  userCarts.set(userId, cart);
  res.json({ success: true });
});

// PayFast notification handler
app.post('/api/payfast-notify', (req, res) => {
  console.log('PayFast notification received:', req.body);
  
  // Handle PayFast payment notification
  const paymentStatus = req.body.payment_status;
  const orderId = req.body.custom_str3 || 'ORDER-' + Date.now();
  
  if (paymentStatus === 'COMPLETE') {
    console.log('Payment completed for order:', orderId);
    // Here you would typically update the order status in your database
  }
  
  res.status(200).send('OK');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    connections: io.engine.clientsCount,
    activeUsers: userSessions.size,
    activeCarts: userCarts.size
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Real-time server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
