# Real-Time Cart & Checkout System Test Guide

## 🧪 Complete Testing Workflow

### **Prerequisites**
- Real-time server running on port 4000
- Frontend dev server running on port 5174
- JSON server running on port 3001 (optional)

### **Test 1: Basic Cart Functionality**

1. **Open multiple browser tabs** to `http://localhost:5174`
2. **Navigate to Buy page** (`/buy`)
3. **Add items to cart** in one tab
4. **Verify cart count updates** in all tabs instantly
5. **Click cart icon** to open modal
6. **Check connection status** (should show 🟢 Connected)

### **Test 2: Real-Time Cart Updates**

1. **Add different items** in different tabs
2. **Watch cart sync** across all tabs
3. **Update quantities** in cart modal
4. **Remove items** and verify updates
5. **Test offline mode** by stopping real-time server

### **Test 3: Checkout Flow**

1. **Add items to cart**
2. **Navigate to checkout** (`/checkout`)
3. **Verify cart items** are displayed correctly
4. **Check connection status** in checkout page
5. **Fill delivery form** with test data
6. **Click "Pay & Complete Order"**
7. **Verify redirect** to payment success page
8. **Check cart is cleared** across all tabs

### **Test 4: Payment Success Flow**

1. **Complete checkout process**
2. **Verify payment success page** loads
3. **Check order details** are displayed
4. **Verify cart is empty** in all tabs
5. **Test navigation** to orders page
6. **Test "Continue Shopping"** button

### **Test 5: Cross-Tab Synchronization**

1. **Open 3+ browser tabs**
2. **Add items in Tab 1**
3. **Modify quantities in Tab 2**
4. **Remove items in Tab 3**
5. **Verify all changes sync** instantly
6. **Test cart modal** in all tabs

### **Test 6: Offline Functionality**

1. **Stop real-time server** (`Ctrl+C`)
2. **Add items to cart** (should work with localStorage)
3. **Check connection status** (should show 🔴 Disconnected)
4. **Complete checkout** (should work offline)
5. **Restart real-time server**
6. **Verify reconnection** (should show 🟢 Connected)

### **Test 7: Error Handling**

1. **Disconnect network**
2. **Try cart operations** (should use localStorage)
3. **Reconnect network**
4. **Verify real-time sync** resumes
5. **Test API failures** (should show fallback data)

## ✅ Expected Results

### **Real-Time Features**
- ✅ Cart updates instantly across all tabs
- ✅ Connection status shows correctly
- ✅ Offline mode works with localStorage
- ✅ Reconnection works automatically

### **Checkout Process**
- ✅ Cart items display correctly
- ✅ Total calculation is accurate
- ✅ Payment flow works smoothly
- ✅ Cart clears after successful payment
- ✅ Success page shows order details

### **UI/UX**
- ✅ Cart modal animations work
- ✅ Connection status indicators visible
- ✅ Error messages are clear
- ✅ Loading states work properly

## 🐛 Common Issues & Solutions

### **Cart Not Updating**
- Check if AuthCartProvider wraps the app
- Verify socket connection is active
- Check browser console for errors

### **Connection Issues**
- Ensure real-time server is running on port 4000
- Check CORS settings in server
- Verify network connectivity

### **Checkout Errors**
- Check if JSON server is running (for laptop data)
- Verify form validation works
- Test with different cart states

## 📊 Performance Metrics

### **Real-Time Latency**
- Cart updates: < 100ms
- Connection status: < 50ms
- Cross-tab sync: < 200ms

### **Offline Performance**
- localStorage operations: < 10ms
- Fallback loading: < 100ms
- Reconnection time: < 2s

## 🔧 Debug Commands

```bash
# Start all servers
npm run realtime  # Terminal 1
npm run dev       # Terminal 2
npx json-server --watch db.json --port 3001  # Terminal 3

# Check server status
curl http://localhost:4000/health

# Test socket connection
# Open browser console and check for connection logs
```

## 📝 Test Checklist

- [ ] Real-time server starts without errors
- [ ] Frontend connects to socket server
- [ ] Cart updates sync across tabs
- [ ] Connection status shows correctly
- [ ] Cart modal opens and displays items
- [ ] Quantity controls work in modal
- [ ] Remove buttons work in modal
- [ ] Checkout page loads cart items
- [ ] Payment flow completes successfully
- [ ] Cart clears after payment
- [ ] Success page shows order details
- [ ] Offline mode works when server stops
- [ ] Reconnection works when server restarts
- [ ] Error handling works for API failures
- [ ] UI animations work smoothly
- [ ] All navigation buttons work correctly

## 🎯 Success Criteria

The real-time cart system is working correctly if:
1. **All tests pass** ✅
2. **No console errors** ✅
3. **Real-time updates work** ✅
4. **Offline fallback works** ✅
5. **Checkout process completes** ✅
6. **UI is responsive and smooth** ✅ 