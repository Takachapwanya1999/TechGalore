# Real PayFast Integration Test Guide

## 🚀 **Complete System Setup**

### **Running All Servers:**

1. **Real-time Server** (Port 4000):
   ```bash
   npm run realtime
   ```

2. **Frontend Dev Server** (Port 5174):
   ```bash
   npm run dev
   ```

3. **JSON Server** (Port 3001):
   ```bash
   npx json-server --watch db.json --port 3001
   ```

## 🧪 **Testing Real PayFast Integration**

### **Test 1: Complete Shopping Flow**

1. **Open browser** to `http://localhost:5174`
2. **Navigate to Buy page** (`/buy`)
3. **Add items to cart** - watch real-time updates
4. **Open cart modal** - verify totals and checkout button
5. **Click "Proceed to Checkout"** - should navigate to checkout

### **Test 2: Checkout Form Validation**

1. **Fill delivery form** with test data:
   - Full Name: "John Doe"
   - Email: "test@example.com"
   - Phone: "0821234567"
   - Address: "123 Test Street, Cape Town"
   - Notes: "Test order"
2. **Try submitting** without required fields
3. **Verify validation** shows error messages
4. **Fill all required fields** and proceed

### **Test 3: Real PayFast Payment**

1. **Complete checkout form** with valid data
2. **Click "Pay R [amount]"** button
3. **Verify redirect** to PayFast payment page
4. **Test PayFast sandbox** payment methods:
   - Credit Card: 4111111111111111
   - Expiry: 12/25
   - CVV: 123
5. **Complete payment** on PayFast
6. **Verify return** to success page

### **Test 4: Payment Success Flow**

1. **Complete PayFast payment**
2. **Check return URL** redirects to success page
3. **Verify order details** are displayed
4. **Check cart is cleared** across all tabs
5. **Test navigation** to orders page
6. **Verify order** appears in orders list

### **Test 5: Real-time Features**

1. **Open multiple browser tabs**
2. **Add items in one tab**
3. **Watch cart updates** in real-time
4. **Check connection status** indicators
5. **Test offline mode** by stopping real-time server
6. **Verify reconnection** when server restarts

## 🔧 **PayFast Configuration**

### **Live PayFast Settings:**
- **Merchant ID**: 10040118
- **Merchant Key**: skm5msi8i6q28
- **Payment URL**: https://www.payfast.co.za/eng/process
- **Sandbox Mode**: Available for testing

### **PayFast Form Fields:**
- `merchant_id`: Your PayFast merchant ID
- `merchant_key`: Your PayFast merchant key
- `amount`: Total payment amount
- `item_name`: Product description
- `name_first`: Customer first name
- `name_last`: Customer last name
- `email_address`: Customer email
- `cell_number`: Customer phone
- `custom_str1`: Delivery address
- `custom_str2`: Order notes
- `custom_str3`: Order ID
- `return_url`: Success page URL
- `cancel_url`: Cancel page URL
- `notify_url`: Payment notification URL

## 📊 **Expected Results**

### **✅ Successful Payment Flow:**
1. **Form validation** works correctly
2. **PayFast redirect** happens smoothly
3. **Payment processing** completes successfully
4. **Success page** shows order details
5. **Cart clearing** works across tabs
6. **Order saving** to database
7. **Real-time updates** function properly

### **🛡️ Security Features:**
- **SSL encryption** on PayFast
- **Form validation** prevents invalid data
- **Error handling** for failed payments
- **Secure redirects** with proper URLs
- **Database backup** for order tracking

## 🐛 **Troubleshooting**

### **Payment Issues:**
- **Check PayFast credentials** are correct
- **Verify return URLs** are accessible
- **Test with sandbox** mode first
- **Check network connectivity**
- **Review browser console** for errors

### **Real-time Issues:**
- **Ensure real-time server** is running on port 4000
- **Check socket connection** in browser console
- **Verify CORS settings** in server
- **Test reconnection** functionality

### **Database Issues:**
- **Start JSON server** on port 3001
- **Check db.json** file exists
- **Verify API endpoints** are accessible
- **Test order creation** manually

## 📝 **Test Checklist**

- [ ] Real-time server starts without errors
- [ ] Frontend connects to socket server
- [ ] Cart updates sync across tabs
- [ ] Checkout form validation works
- [ ] PayFast redirect functions properly
- [ ] Payment processing completes
- [ ] Success page displays correctly
- [ ] Cart clears after payment
- [ ] Order saves to database
- [ ] Real-time status indicators work
- [ ] Offline mode functions properly
- [ ] Error handling works correctly

## 🎯 **Success Criteria**

The real PayFast integration is working correctly if:
1. **All servers run** without errors ✅
2. **Payment flow completes** successfully ✅
3. **Real-time features** work properly ✅
4. **Order tracking** functions correctly ✅
5. **User experience** is smooth and professional ✅
6. **Security measures** are in place ✅

## 🔗 **Useful Links**

- **PayFast Documentation**: https://developers.payfast.co.za/
- **PayFast Sandbox**: https://sandbox.payfast.co.za/
- **PayFast Live**: https://www.payfast.co.za/
- **Socket.IO Docs**: https://socket.io/docs/
- **React Icons**: https://react-icons.github.io/react-icons/ 