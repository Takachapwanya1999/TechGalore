# Real-Time Cart System

This e-commerce application now includes a real-time cart system that provides instant updates across multiple browser tabs and devices.

## Features

- **Real-time cart updates** using Socket.IO
- **Cross-tab synchronization** - cart changes in one tab update all other tabs
- **Connection status indicator** - shows if real-time connection is active
- **Persistent storage** - cart data is saved to localStorage as fallback
- **Modern UI** - beautiful cart modal with animations

## Setup Instructions

### 1. Start the Real-Time Server

Open a new terminal and run:

```bash
npm run realtime
```

This starts the Socket.IO server on port 4000.

### 2. Start the Frontend Development Server

In another terminal, run:

```bash
npm run dev
```

This starts the Vite development server on port 5173.

### 3. Start the JSON Server (if needed)

If you need the laptop data API, start the JSON server:

```bash
npx json-server --watch db.json --port 3001
```

## How It Works

### Real-Time Architecture

1. **Socket.IO Connection**: The frontend connects to the real-time server on port 4000
2. **Cart Context**: All cart operations go through the `AuthCartContext`
3. **Event Broadcasting**: Cart changes are broadcast to all connected clients
4. **Fallback Storage**: localStorage ensures cart persistence even if connection is lost

### Cart Operations

- **Add to Cart**: Increases quantity if item exists, adds new item if not
- **Remove from Cart**: Completely removes item from cart
- **Update Quantity**: Changes item quantity (removes if quantity ≤ 0)
- **Clear Cart**: Removes all items from cart

### Connection Status

The cart modal shows real-time connection status:
- 🟢 **Connected**: Real-time updates are working
- 🔴 **Disconnected**: Using localStorage fallback only

## Components

### AuthCartContext
- Manages cart state and operations
- Handles Socket.IO connections
- Provides cart data to all components

### CartModal
- Displays cart items in a modal
- Shows connection status
- Allows quantity adjustments and item removal

### Navbar
- Shows cart count badge
- Opens cart modal on click
- Displays real-time connection status

## API Endpoints

### Real-Time Server (Port 4000)
- `GET /health` - Server health check
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/:userId` - Update user's cart

### Socket Events
- `cart-sync` - Sync cart data with server
- `cart-update` - Update cart and broadcast to all clients
- `cart-updated` - Receive cart updates from other clients
- `user-login` - Handle user authentication
- `user-logout` - Handle user logout

## Testing Real-Time Features

1. **Open multiple browser tabs** to the same application
2. **Add items to cart** in one tab
3. **Watch the cart count update** in real-time across all tabs
4. **Check the cart modal** to see connection status
5. **Disconnect the real-time server** to test fallback behavior

## Troubleshooting

### Connection Issues
- Check if real-time server is running on port 4000
- Verify CORS settings in the server
- Check browser console for connection errors

### Cart Not Updating
- Ensure AuthCartProvider wraps the entire app
- Check if cart context is properly imported
- Verify localStorage is not disabled

### Performance Issues
- Cart updates are debounced to prevent excessive server calls
- Large cart data is optimized for transmission
- Fallback to localStorage ensures offline functionality

## Future Enhancements

- User authentication integration
- Cart sharing between devices
- Real-time inventory updates
- Push notifications for cart changes
- Analytics and tracking 