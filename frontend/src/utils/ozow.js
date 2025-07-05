// Ozow Payment Integration
// Based on: https://hub.ozow.com/docs/payin-api/f1oidk1k60jc5-step-1-post-from-merchant-website

// Ozow Configuration (Replace with your actual credentials)
const OZOW_CONFIG = {
  // Sandbox/Test Environment
  SITE_CODE: 'TEST_SITE_CODE', // Replace with your actual site code
  PRIVATE_KEY: 'TEST_PRIVATE_KEY', // Replace with your actual private key
  API_KEY: 'TEST_API_KEY', // Replace with your actual API key
  COUNTRY_CODE: 'ZA',
  CURRENCY_CODE: 'ZAR',
  TRANSACTION_ID: '',
  BANK_REFERENCE: '',
  OPTIONAL_1: '',
  OPTIONAL_2: '',
  OPTIONAL_3: '',
  OPTIONAL_4: '',
  OPTIONAL_5: '',
  IS_TEST: true, // Set to false for production
  RETURN_URL: '',
  CANCEL_URL: '',
  ERROR_URL: '',
  NOTIFY_URL: '',
  CUSTOMER: {
    FIRST_NAME: '',
    LAST_NAME: '',
    EMAIL: '',
    CELL_NUMBER: ''
  }
};

// Generate unique transaction ID
const generateTransactionId = () => {
  return 'OZOW_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Generate unique bank reference
const generateBankReference = () => {
  return 'REF_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
};

// Create Ozow payment hash (simplified for demo - use proper crypto in production)
const createOzowHash = (data) => {
  // In production, use proper cryptographic hash
  // This is a simplified version for demonstration
  const hashString = Object.values(data).join('');
  return btoa(hashString).substring(0, 32);
};

// Prepare Ozow payment data
export const prepareOzowPayment = (orderData, customerData) => {
  const transactionId = generateTransactionId();
  const bankReference = generateBankReference();
  
  const ozowData = {
    SiteCode: OZOW_CONFIG.SITE_CODE,
    CountryCode: OZOW_CONFIG.COUNTRY_CODE,
    CurrencyCode: OZOW_CONFIG.CURRENCY_CODE,
    Amount: orderData.total.toFixed(2),
    TransactionId: transactionId,
    BankReference: bankReference,
    Optional1: customerData.address || '',
    Optional2: customerData.notes || '',
    Optional3: orderData.orderId || '',
    Optional4: '',
    Optional5: '',
    IsTest: OZOW_CONFIG.IS_TEST,
    ReturnUrl: window.location.origin + '/payment-success',
    CancelUrl: window.location.origin + '/checkout',
    ErrorUrl: window.location.origin + '/checkout',
    NotifyUrl: window.location.origin + '/api/ozow-notify',
    Customer: {
      FirstName: customerData.name.split(' ')[0] || '',
      LastName: customerData.name.split(' ').slice(1).join(' ') || '',
      Email: customerData.email || '',
      CellNumber: customerData.phone || ''
    }
  };

  // Generate hash (in production, use proper crypto library)
  const hash = createOzowHash(ozowData);
  ozowData.HashCheck = hash;

  return {
    ...ozowData,
    transactionId,
    bankReference
  };
};

// Create Ozow payment form
export const createOzowForm = (ozowData) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = OZOW_CONFIG.IS_TEST 
    ? 'https://pay.ozow.com' // Test URL
    : 'https://pay.ozow.com'; // Production URL

  // Add all Ozow fields
  Object.entries(ozowData).forEach(([key, value]) => {
    if (key !== 'Customer' && key !== 'transactionId' && key !== 'bankReference') {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }
  });

  // Add customer fields
  if (ozowData.Customer) {
    Object.entries(ozowData.Customer).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = `Customer.${key}`;
      input.value = value;
      form.appendChild(input);
    });
  }

  return form;
};

// Handle Ozow payment submission
export const submitOzowPayment = (ozowData) => {
  return new Promise((resolve, reject) => {
    try {
      const form = createOzowForm(ozowData);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      resolve({ success: true, transactionId: ozowData.transactionId });
    } catch (error) {
      reject({ success: false, error: error.message });
    }
  });
};

// Validate Ozow response (for return/cancel/error URLs)
export const validateOzowResponse = (responseData) => {
  // In production, validate the hash from Ozow
  // This is a simplified validation
  return {
    isValid: true,
    transactionId: responseData.TransactionId,
    status: responseData.Status,
    amount: responseData.Amount,
    bankReference: responseData.BankReference
  };
};

export default {
  prepareOzowPayment,
  submitOzowPayment,
  validateOzowResponse,
  OZOW_CONFIG
}; 