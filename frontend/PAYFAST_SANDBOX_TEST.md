# PayFast Sandbox Integration Test Guide

## 🚀 **System Status**

### **All Servers Running:**
- ✅ **Real-time server** on port 4000 (Socket.IO)
- ✅ **Frontend dev server** on port 5175 (Vite)
- ✅ **JSON server** on port 3001 (Database)

### **PayFast Sandbox Configuration:**
- **Merchant ID**: 10040118
- **Merchant Key**: skm5msi8i6q28
- **Sandbox URL**: https://sandbox.payfast.co.za/eng/process
- **Test Mode**: Enabled

## 🧪 **Complete Test Workflow**

### **Step 1: Access the Application**
1. **Open browser** to `http://localhost:5175`
2. **Verify all pages load** correctly
3. **Check real-time connection** status (should show "Connected")

### **Step 2: Test Shopping Cart**
1. **Navigate to Buy page** (`/buy`)
2. **Add multiple items** to cart
3. **Open multiple browser tabs** to test real-time sync
4. **Watch cart count update** across all tabs
5. **Click cart icon** to open modal
6. **Verify totals** and checkout button work

### **Step 3: Test Checkout Process**
1. **Click "Proceed to Checkout"** from cart modal
2. **Fill delivery form** with test data:
   ```
   Full Name: John Doe
   Email: test@example.com
   Phone: 0821234567
   Address: 123 Test Street, Cape Town
   Notes: Test order for sandbox
   ```
3. **Verify form validation** works
4. **Check order summary** displays correctly
5. **Verify total amount** is accurate

### **Step 4: Test PayFast Sandbox Payment**
1. **Click "Pay R [amount]"** button
2. **Verify redirect** to PayFast sandbox
3. **Use test payment details**:
   ```
   Card Number: 4111111111111111
   Expiry Date: 12/25
   CVV: 123
   ```
4. **Complete payment** on PayFast sandbox
5. **Verify return** to success page

### **Step 5: Verify Success Flow**
1. **Check success page** loads correctly
2. **Verify order details** are displayed
3. **Check cart is cleared** across all tabs
4. **Test navigation** to orders page
5. **Verify order** appears in database

## 🔧 **PayFast Sandbox Test Cards**

### **Credit Card (Visa):**
- **Number**: 4111111111111111
- **Expiry**: 12/25
- **CVV**: 123

### **Credit Card (Mastercard):**
- **Number**: 5555555555554444
- **Expiry**: 12/25
- **CVV**: 123

### **EFT (Electronic Funds Transfer):**
- **Bank**: Any South African bank
- **Account Type**: Savings/Current
- **Test Mode**: No real money transferred

## 📊 **Expected Results**

### **✅ Real-time Features:**
- Cart updates instantly across all tabs
- Connection status shows "Connected"
- Cart modal displays correct totals
- Checkout button navigates properly

### **✅ Checkout Process:**
- Form validation prevents invalid submissions
- Order summary shows correct items and totals
- PayFast redirect works smoothly
- Payment processing completes successfully

### **✅ PayFast Sandbox:**
- Redirects to sandbox environment
- Accepts test payment details
- Processes payment without real charges
- Returns to success page correctly

### **✅ Success Flow:**
- Success page displays order details
- Cart clears across all tabs
- Order saves to database
- Navigation buttons work properly

## 🐛 **Troubleshooting**

### **Real-time Issues:**
- **Check real-time server** is running on port 4000
- **Verify socket connection** in browser console
- **Test reconnection** by refreshing page

### **Payment Issues:**
- **Verify PayFast credentials** are correct
- **Check sandbox URL** is being used
- **Test with different** payment methods
- **Review browser console** for errors

### **Database Issues:**
- **Ensure JSON server** is running on port 3001
- **Check db.json** file exists
- **Verify API endpoints** are accessible

## 📝 **Test Checklist**

- [ ] Real-time server starts without errors
- [ ] Frontend connects to socket server
- [ ] Cart updates sync across tabs
- [ ] Checkout form validation works
- [ ] PayFast sandbox redirect functions
- [ ] Payment processing completes
- [ ] Success page displays correctly
- [ ] Cart clears after payment
- [ ] Order saves to database
- [ ] Real-time status indicators work
- [ ] Offline mode functions properly
- [ ] Error handling works correctly

## 🎯 **Success Criteria**

The PayFast sandbox integration is working correctly if:
1. **All servers run** without errors ✅
2. **Payment flow completes** successfully ✅
3. **Real-time features** work properly ✅
4. **Order tracking** functions correctly ✅
5. **User experience** is smooth and professional ✅
6. **Sandbox mode** prevents real charges ✅

## 🔗 **Useful Links**

- **PayFast Sandbox**: https://sandbox.payfast.co.za/
- **PayFast Documentation**: https://developers.payfast.co.za/
- **Test Cards**: https://developers.payfast.co.za/docs/test_cards
- **Sandbox Testing**: https://sandbox.payfast.co.za/eng/process

## 💡 **Testing Tips**

1. **Use multiple browser tabs** to test real-time features
2. **Try different payment methods** in sandbox
3. **Test form validation** with invalid data
4. **Check network connectivity** for payment processing
5. **Monitor browser console** for any errors
6. **Verify database updates** after successful payments 