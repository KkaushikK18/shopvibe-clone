# 💳 Payment Gateway Integration Guide

## Is it Tough? **NO!** 

Payment gateway integration is actually quite simple. Most providers give you:
- ✅ Ready-to-use SDKs
- ✅ Clear documentation
- ✅ Test environments
- ✅ Code examples
- ✅ Support teams

**Time to integrate**: 2-4 hours for basic integration

---

## 🇮🇳 Popular Payment Gateways in India

### 1. **Razorpay** ⭐ (Recommended - Easiest)
- **Pros**: Super easy, great docs, instant activation, low fees
- **Fees**: 2% per transaction
- **Setup Time**: 30 minutes
- **Best For**: Startups, small to medium businesses

### 2. **Stripe**
- **Pros**: International support, excellent API, modern
- **Fees**: 2.9% + ₹2 per transaction
- **Setup Time**: 1 hour
- **Best For**: International businesses

### 3. **PayU**
- **Pros**: Popular in India, multiple payment options
- **Fees**: 2-3% per transaction
- **Setup Time**: 1-2 hours
- **Best For**: Established businesses

### 4. **Paytm**
- **Pros**: Huge user base in India, wallet integration
- **Fees**: 2-3% per transaction
- **Setup Time**: 2-3 hours
- **Best For**: High-volume businesses

### 5. **Cashfree**
- **Pros**: Good for payouts too, competitive pricing
- **Fees**: 1.95% per transaction
- **Setup Time**: 1 hour
- **Best For**: Businesses needing both payments and payouts

---

## 🚀 Quick Integration Example - Razorpay

### Step 1: Install Razorpay
```bash
npm install razorpay
```

### Step 2: Get API Keys
1. Sign up at https://razorpay.com
2. Go to Settings → API Keys
3. Generate Test Keys (for development)
4. Generate Live Keys (for production)

### Step 3: Create Payment Component

```typescript
// src/components/RazorpayPayment.tsx
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RazorpayPaymentProps {
  amount: number; // in rupees
  orderId: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (error: any) => void;
}

export const RazorpayPayment = ({
  amount,
  orderId,
  customerEmail,
  customerName,
  customerPhone,
  onSuccess,
  onFailure,
}: RazorpayPaymentProps) => {
  
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: amount * 100, // Amount in paise (₹1 = 100 paise)
      currency: 'INR',
      name: 'Amazon Clone',
      description: `Order #${orderId}`,
      image: '/logo.png', // Your logo
      order_id: orderId, // Order ID from backend
      handler: function (response: any) {
        // Payment successful
        console.log('Payment Success:', response);
        toast.success('Payment successful!');
        onSuccess(response.razorpay_payment_id);
      },
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      notes: {
        order_id: orderId,
      },
      theme: {
        color: '#FF9900', // Amazon orange
      },
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
        }
      }
    };

    const razorpay = new (window as any).Razorpay(options);
    
    razorpay.on('payment.failed', function (response: any) {
      console.error('Payment Failed:', response.error);
      toast.error('Payment failed. Please try again.');
      onFailure(response.error);
    });

    razorpay.open();
  };

  return (
    <Button
      onClick={handlePayment}
      className="w-full bg-primary hover:bg-primary-hover"
      size="lg"
    >
      Pay ₹{amount.toLocaleString('en-IN')}
    </Button>
  );
};
```

### Step 4: Update Checkout Page

```typescript
// src/pages/Checkout.tsx - Add this to your existing checkout

import { RazorpayPayment } from '@/components/RazorpayPayment';
import { useState } from 'react';

// Inside your Checkout component:
const [showPayment, setShowPayment] = useState(false);
const [orderId, setOrderId] = useState('');

const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fix the errors in the form");
    return;
  }

  if (paymentMethod === 'card') {
    // Create order on backend first
    try {
      setIsLoading(true);
      
      // Call your backend to create Razorpay order
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });
      
      const data = await response.json();
      setOrderId(data.orderId);
      setShowPayment(true);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to initiate payment');
      setIsLoading(false);
    }
  } else {
    // COD or UPI - process normally
    handleOrderSuccess();
  }
};

const handlePaymentSuccess = (paymentId: string) => {
  // Verify payment on backend
  fetch('/api/verify-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId,
      paymentId,
      signature: 'signature_from_razorpay',
    }),
  })
  .then(() => {
    toast.success("Order placed successfully! 🎉");
    clearCart();
    navigate("/");
  })
  .catch(() => {
    toast.error("Payment verification failed");
  });
};

// In your JSX, replace the Place Order button with:
{showPayment ? (
  <RazorpayPayment
    amount={total}
    orderId={orderId}
    customerEmail={user?.email || ''}
    customerName={formData.name}
    customerPhone={formData.phone}
    onSuccess={handlePaymentSuccess}
    onFailure={(error) => {
      console.error(error);
      setShowPayment(false);
    }}
  />
) : (
  <Button
    type="submit"
    className="mt-6 w-full bg-primary hover:bg-primary-hover"
    size="lg"
    disabled={isLoading}
  >
    {isLoading ? "Processing..." : `Place Order - ₹${total.toLocaleString('en-IN')}`}
  </Button>
)}
```

### Step 5: Backend Setup (Node.js/Express Example)

```javascript
// backend/server.js
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;
    
    const options = {
      amount: amount * 100, // amount in paise
      currency: currency || 'INR',
      receipt: receipt,
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify Payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    // Verify signature
    const text = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    if (expectedSignature === signature) {
      // Payment is verified
      // Save order to database
      // Send confirmation email
      
      res.json({ success: true, message: 'Payment verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Step 6: Environment Variables

```env
# .env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx

# backend/.env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_key_here
```

---

## 🎯 Complete Integration Checklist

### Frontend
- [ ] Install Razorpay SDK
- [ ] Create payment component
- [ ] Add payment button to checkout
- [ ] Handle success/failure callbacks
- [ ] Show loading states
- [ ] Display error messages

### Backend
- [ ] Install Razorpay package
- [ ] Create order endpoint
- [ ] Create verification endpoint
- [ ] Store orders in database
- [ ] Send confirmation emails
- [ ] Handle webhooks (optional)

### Testing
- [ ] Test with test cards
- [ ] Test payment success flow
- [ ] Test payment failure flow
- [ ] Test payment cancellation
- [ ] Test different payment methods
- [ ] Test on mobile devices

### Production
- [ ] Switch to live API keys
- [ ] Enable webhooks
- [ ] Set up monitoring
- [ ] Configure refund policy
- [ ] Add customer support

---

## 💡 Test Cards (Razorpay)

### Successful Payment
- **Card Number**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Failed Payment
- **Card Number**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### UPI Test
- **UPI ID**: success@razorpay
- **UPI ID (Failure)**: failure@razorpay

---

## 🔒 Security Best Practices

1. **Never expose secret keys** in frontend code
2. **Always verify payments** on the backend
3. **Use HTTPS** in production
4. **Validate amounts** on backend
5. **Store payment IDs** for reference
6. **Implement webhooks** for reliability
7. **Log all transactions** for auditing
8. **Handle refunds** properly
9. **Comply with PCI DSS** standards
10. **Use environment variables** for keys

---

## 📊 Payment Flow Diagram

```
User Clicks "Pay Now"
        ↓
Frontend creates order request
        ↓
Backend creates Razorpay order
        ↓
Backend returns order_id
        ↓
Frontend opens Razorpay checkout
        ↓
User enters payment details
        ↓
Razorpay processes payment
        ↓
Success/Failure callback
        ↓
Frontend sends to backend for verification
        ↓
Backend verifies signature
        ↓
Backend saves order
        ↓
Backend sends confirmation
        ↓
Frontend shows success message
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Razorpay is not defined"
**Solution**: Make sure the Razorpay script is loaded before calling it
```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.body.appendChild(script);
}, []);
```

### Issue 2: Payment succeeds but order not saved
**Solution**: Always verify payment on backend before saving order

### Issue 3: Amount mismatch
**Solution**: Remember Razorpay uses paise (multiply by 100)
```typescript
amount: amount * 100 // ₹100 = 10000 paise
```

### Issue 4: Signature verification fails
**Solution**: Check if you're using the correct secret key and format
```javascript
const text = orderId + '|' + paymentId;
```

---

## 💰 Cost Breakdown

### Razorpay Pricing
- **Transaction Fee**: 2% per transaction
- **Setup Fee**: ₹0
- **Annual Fee**: ₹0
- **Settlement**: T+3 days (3 days after transaction)

### Example Calculation
- Order Amount: ₹1,000
- Razorpay Fee: ₹20 (2%)
- You Receive: ₹980

---

## 🎓 Learning Resources

### Official Documentation
- [Razorpay Docs](https://razorpay.com/docs/)
- [Razorpay React Integration](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)

### Video Tutorials
- Search YouTube: "Razorpay React Integration"
- Search YouTube: "Payment Gateway Integration Node.js"

### Code Examples
- [Razorpay GitHub](https://github.com/razorpay)
- [Sample Projects](https://github.com/razorpay/razorpay-node)

---

## 🎯 Quick Start Summary

1. **Sign up** on Razorpay (5 minutes)
2. **Get API keys** from dashboard (2 minutes)
3. **Install package** `npm install razorpay` (1 minute)
4. **Copy payment component** from above (10 minutes)
5. **Add to checkout page** (15 minutes)
6. **Create backend endpoints** (30 minutes)
7. **Test with test cards** (15 minutes)
8. **Go live** with real keys (5 minutes)

**Total Time**: ~1.5 hours for complete integration! 🚀

---

## ✅ Advantages of Payment Gateway

1. **Security**: PCI DSS compliant, secure transactions
2. **Trust**: Customers trust known payment brands
3. **Multiple Options**: Cards, UPI, Wallets, Net Banking
4. **Automatic**: No manual payment verification needed
5. **Instant**: Real-time payment confirmation
6. **Refunds**: Easy refund processing
7. **Reports**: Detailed transaction reports
8. **Support**: 24/7 customer support

---

## 🎊 Conclusion

**Is it tough?** NO! 

Payment gateway integration is:
- ✅ Well-documented
- ✅ Has ready SDKs
- ✅ Takes 1-2 hours
- ✅ Has test environments
- ✅ Has good support
- ✅ Worth the effort

**You can do it!** Just follow the steps above, and you'll have a working payment system in no time. Start with test mode, get comfortable, then switch to live mode.

**Pro Tip**: Start with Razorpay - it's the easiest and most developer-friendly option in India! 🇮🇳

---

**Need Help?** 
- Razorpay Support: support@razorpay.com
- Documentation: https://razorpay.com/docs/
- Community: Stack Overflow (tag: razorpay)

**Happy Coding!** 💻✨
