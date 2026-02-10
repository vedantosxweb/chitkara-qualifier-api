const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Your official email
const OFFICIAL_EMAIL = "vedant1579.be23@chitkarauniversity.edu.in";

// Helper Functions
function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib;
}

function isPrime(num) {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(arr) {
  return arr.filter(num => isPrime(num));
}

function calculateGCD(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function calculateHCF(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => calculateGCD(a, b));
}

function calculateLCM(arr) {
  if (arr.length === 0) return 0;
  
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const lcm = (a, b) => (a * b) / gcd(a, b);
  
  return arr.reduce((a, b) => lcm(a, b));
}

async function getAIResponse(question) {
  try {
    const { GoogleGenAI } = require('@google/genai');  // <-- NEW IMPORT
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',  // or 'gemini-2.5-flash'
      contents: `Answer the following question with a single word or very short phrase (maximum 3 words). Question: ${question}`,
    });

    const text = response.text.trim();
    
    // Extract single word or short answer
    const words = text.split(/\s+/);
    return words.length > 3 ? words.slice(0, 3).join(' ') : text;
    
  } catch (error) {
    console.error('AI Error:', error);
    throw new Error('AI service unavailable');
  }
}
// POST /bfhl endpoint
app.post('/bfhl', async (req, res) => {
  try {
    const body = req.body;
    
    // Validate that exactly one key is present
    const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
    const providedKeys = Object.keys(body).filter(key => validKeys.includes(key));
    
    if (providedKeys.length === 0) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "No valid operation key provided. Expected one of: fibonacci, prime, lcm, hcf, AI"
      });
    }
    
    if (providedKeys.length > 1) {
      return res.status(400).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        error: "Multiple operation keys provided. Only one is allowed per request"
      });
    }
    
    const key = providedKeys[0];
    const value = body[key];
    
    let data;
    
    switch (key) {
      case 'fibonacci':
        if (!Number.isInteger(value) || value < 0) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: "fibonacci requires a non-negative integer"
          });
        }
        data = generateFibonacci(value);
        break;
        
      case 'prime':
        if (!Array.isArray(value) || !value.every(item => Number.isInteger(item))) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: "prime requires an array of integers"
          });
        }
        data = filterPrimes(value);
        break;
        
      case 'lcm':
        if (!Array.isArray(value) || value.length === 0 || !value.every(item => Number.isInteger(item) && item > 0)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: "lcm requires an array of positive integers"
          });
        }
        data = calculateLCM(value);
        break;
        
      case 'hcf':
        if (!Array.isArray(value) || value.length === 0 || !value.every(item => Number.isInteger(item) && item > 0)) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: "hcf requires an array of positive integers"
          });
        }
        data = calculateHCF(value);
        break;
        
      case 'AI':
        if (typeof value !== 'string' || value.trim().length === 0) {
          return res.status(400).json({
            is_success: false,
            official_email: OFFICIAL_EMAIL,
            error: "AI requires a non-empty string question"
          });
        }
        data = await getAIResponse(value);
        break;
        
      default:
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          error: "Invalid operation key"
        });
    }
    
    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data: data
    });
    
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: "Internal server error"
    });
  }
});

// GET /health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: OFFICIAL_EMAIL
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: "Internal server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    official_email: OFFICIAL_EMAIL,
    error: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
