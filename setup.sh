#!/bin/bash

# Chitkara Qualifier API - Local Setup Script

echo "=================================="
echo "Chitkara Qualifier API - Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  No .env file found!"
    echo "Creating .env from template..."
    cp .env.example .env
    echo ""
    echo "📝 Please edit .env file and add your GEMINI_API_KEY"
    echo "   Get your key from: https://aistudio.google.com"
    echo ""
    echo "Press Enter after you've added your API key..."
    read
fi

# Start the server
echo "🚀 Starting server..."
echo ""
npm start
