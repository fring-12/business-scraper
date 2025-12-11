#!/usr/bin/env node

/**
 * Test script to verify Yelp API key is working
 * Usage: node scripts/test-api.js
 */

const https = require('https');

// Load environment variables
require('fs').readFile('.env.local', 'utf8', (err, data) => {
  if (err) {
    console.error('\n❌ Error: .env.local file not found!');
    console.error('Please create .env.local file with your YELP_API_KEY\n');
    process.exit(1);
  }

  const apiKey = data.match(/YELP_API_KEY=(.*)/)?.[1]?.trim();

  if (!apiKey || apiKey === '') {
    console.error('\n❌ Error: YELP_API_KEY is not set in .env.local');
    console.error('Please add your Yelp API key to .env.local\n');
    console.error('Get your API key at: https://www.yelp.com/developers/v3/manage_app\n');
    process.exit(1);
  }

  console.log('\n🔍 Testing Yelp API connection...\n');

  const options = {
    hostname: 'api.yelp.com',
    path: '/v3/businesses/search?location=San%20Francisco&term=plumber&limit=1',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  };

  const req = https.request(options, (res) => {
    let body = '';

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        const data = JSON.parse(body);
        console.log('✅ SUCCESS! API key is working!\n');
        console.log('📊 Test Results:');
        console.log(`   - Status: ${res.statusCode} OK`);
        console.log(`   - Businesses found: ${data.businesses?.length || 0}`);
        
        if (data.businesses && data.businesses[0]) {
          const biz = data.businesses[0];
          console.log(`   - Sample business: ${biz.name}`);
          console.log(`   - Phone: ${biz.phone || 'N/A'}`);
          console.log(`   - Location: ${biz.location?.city}, ${biz.location?.state}`);
        }
        
        console.log('\n🎉 Your Business Scraper is ready to use!');
        console.log('Run: npm run dev\n');
      } else if (res.statusCode === 401) {
        console.error('❌ ERROR: Invalid API key!');
        console.error('Please check your YELP_API_KEY in .env.local\n');
        console.error('Get your API key at: https://www.yelp.com/developers/v3/manage_app\n');
        process.exit(1);
      } else {
        console.error(`❌ ERROR: Unexpected status code ${res.statusCode}`);
        console.error('Response:', body);
        process.exit(1);
      }
    });
  });

  req.on('error', (e) => {
    console.error('\n❌ ERROR: Network error');
    console.error(e.message);
    process.exit(1);
  });

  req.end();
});

