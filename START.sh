#!/bin/bash

# Business Scraper - Quick Start Script
# This script helps you get started quickly

echo ""
echo "🚀 Business Scraper - Quick Start"
echo "=================================="
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found! Creating from template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your Yelp API key!"
    echo ""
    echo "📝 Steps to get your API key:"
    echo "   1. Go to: https://www.yelp.com/developers/v3/manage_app"
    echo "   2. Create a new app (free)"
    echo "   3. Copy your API key"
    echo "   4. Paste it in .env.local file"
    echo ""
    echo "After adding your API key, run this script again!"
    exit 1
fi

# Check if API key is set
if grep -q "YELP_API_KEY=$" .env.local || grep -q "YELP_API_KEY= *$" .env.local; then
    echo "⚠️  Yelp API key is not configured!"
    echo ""
    echo "📝 Steps to get your API key:"
    echo "   1. Go to: https://www.yelp.com/developers/v3/manage_app"
    echo "   2. Create a new app (free)"
    echo "   3. Copy your API key"
    echo "   4. Open .env.local and paste your key"
    echo ""
    echo "After adding your API key, run this script again!"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --cache=/tmp/npm-cache
    echo ""
fi

# Test API connection
echo "🔍 Testing API connection..."
npm run test-api

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 All set! Starting development server..."
    echo ""
    echo "📱 Open http://localhost:3000 in your browser"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm run dev
else
    echo ""
    echo "❌ API test failed. Please check your API key in .env.local"
    exit 1
fi

