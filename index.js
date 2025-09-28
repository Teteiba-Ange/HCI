import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get Paystack Secret Key from environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.error('PAYSTACK_SECRET_KEY is not defined in environment variables');
  process.exit(1);
}

const paystack = axios.create({
  baseURL: 'https://api.paystack.co',
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Initialize transaction endpoint
app.post('/api/initialize-transaction', async (req, res) => {
  try {
    const { email, amount } = req.body;
    
    // Validate request
    if (!email || !amount) {
      return res.status(400).json({
        status: false,
        message: 'Email and amount are required',
      });
    }

    // Convert amount to pesewas (lowest currency unit for Ghana Cedis)
    // 1 GHS = 100 pesewas
    const amountInPesewas = Math.round(amount * 100);
    const reference = `ref_${Date.now()}`;

    // Create transaction with Paystack
    const response = await paystack.post('/transaction/initialize', {
      email,
      amount: amountInPesewas,
      currency: 'GHS', // Set currency to Ghana Cedis
      reference,
      // No callback_url needed for test mode
    });

    res.json({
      status: true,
      message: 'Transaction initialized successfully',
      data: response.data.data,
    });
  } catch (error) {
    console.error('Error initializing transaction:', error.response?.data || error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to initialize transaction',
      error: error.response?.data || error.message,
    });
  }
});

// Verify transaction endpoint
app.get('/api/verify-transaction/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    if (!reference) {
      return res.status(400).json({
        status: false,
        message: 'Transaction reference is required',
      });
    }

    // Verify transaction with Paystack
    const response = await paystack.get(`/transaction/verify/${reference}`);

    res.json({
      status: true,
      message: 'Transaction verified successfully',
      data: response.data.data,
    });
  } catch (error) {
    console.error('Error verifying transaction:', error.response?.data || error.message);
    res.status(500).json({
      status: false,
      message: 'Failed to verify transaction',
      error: error.response?.data || error.message,
    });
  }
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    currency: 'GHS (Ghana Cedis)',
    paystackKey: PAYSTACK_SECRET_KEY ? 'Configured' : 'Missing'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the server at: http://localhost:${PORT}/api/test`);
  console.log(`Currency set to: GHS (Ghana Cedis)`);
});