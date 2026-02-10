# Chitkara Qualifier 1 - REST API

REST API implementation for Chitkara University Qualifier 1 (Class of 2027)

## Author
**Email:** vedant1579.be23@chitkarauniversity.edu.in

## API Endpoints

### POST /bfhl
Processes one of five operations: fibonacci, prime, lcm, hcf, or AI

### GET /health
Health check endpoint

## Features
- ✅ Strict API response structure
- ✅ Correct HTTP status codes
- ✅ Robust input validation
- ✅ Graceful error handling
- ✅ Security guardrails
- ✅ Google Gemini AI integration

## Tech Stack
- Node.js
- Express.js
- Google Gemini AI API
- CORS enabled

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd chitkara-qualifier-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Google Gemini API Key
1. Visit https://aistudio.google.com
2. Sign in with your Google account
3. Click "Get API Key"
4. Create API key in your project
5. Copy the API key

### 4. Configure Environment
Create a `.env` file in the root directory:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3000
```

### 5. Run Locally
```bash
npm start
```
Or for development with auto-restart:
```bash
npm run dev
```

## API Usage Examples

### Fibonacci
**Request:**
```json
POST /bfhl
{
  "fibonacci": 7
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

### Prime Numbers
**Request:**
```json
POST /bfhl
{
  "prime": [2, 4, 7, 9, 11]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in",
  "data": [2, 7, 11]
}
```

### LCM (Least Common Multiple)
**Request:**
```json
POST /bfhl
{
  "lcm": [12, 18, 24]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in",
  "data": 72
}
```

### HCF (Highest Common Factor)
**Request:**
```json
POST /bfhl
{
  "hcf": [24, 36, 60]
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in",
  "data": 12
}
```

### AI Query
**Request:**
```json
POST /bfhl
{
  "AI": "What is the capital city of Maharashtra?"
}
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in",
  "data": "Mumbai"
}
```

### Health Check
**Request:**
```
GET /health
```
**Response:**
```json
{
  "is_success": true,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in"
}
```

## Error Handling

All errors return appropriate HTTP status codes with structured responses:

```json
{
  "is_success": false,
  "official_email": "vedant1579.be23@chitkarauniversity.edu.in",
  "error": "Error description"
}
```

### Common Error Codes
- **400**: Bad Request (invalid input, multiple keys, wrong data type)
- **404**: Not Found (invalid endpoint)
- **500**: Internal Server Error

## Input Validation Rules

- **fibonacci**: Requires non-negative integer
- **prime**: Requires array of integers
- **lcm**: Requires array of positive integers
- **hcf**: Requires array of positive integers
- **AI**: Requires non-empty string

Only ONE operation key allowed per request.

## Deployment Options

### Option 1: Render
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add `GEMINI_API_KEY`
5. Click "Create Web Service"

### Option 2: Railway
1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy

### Option 3: Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure environment variables
4. Deploy

### Option 4: Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create`
4. Set environment: `heroku config:set GEMINI_API_KEY=your_key`
5. Deploy: `git push heroku main`

## Testing the API

Use Postman, cURL, or any HTTP client:

```bash
# Health check
curl https://your-deployed-url.com/health

# Fibonacci
curl -X POST https://your-deployed-url.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 5}'

# Prime
curl -X POST https://your-deployed-url.com/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [1,2,3,4,5,6,7]}'
```

## Project Structure
```
chitkara-qualifier-api/
├── server.js           # Main application file
├── package.json        # Dependencies
├── .env.example        # Environment template
├── .gitignore         # Git ignore rules
└── README.md          # Documentation
```

## License
MIT

## Contact
For questions or issues, contact: vedant1579.be23@chitkarauniversity.edu.in
