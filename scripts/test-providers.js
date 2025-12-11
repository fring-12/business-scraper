#!/usr/bin/env node

/**
 * Test script to verify all API providers are working
 * Usage: node scripts/test-providers.js
 */

const https = require('https');

// Load environment variables
require('fs').readFile('.env.local', 'utf8', (err, data) => {
  if (err) {
    console.error('\n❌ Error: .env.local file not found!');
    console.error('Please create .env.local file with your API keys\n');
    process.exit(1);
  }

  const googleKey = data.match(/GOOGLE_PLACES_API_KEY=(.*)/)?.[1]?.trim();
  const foursquareKey = data.match(/FOURSQUARE_API_KEY=(.*)/)?.[1]?.trim();
  const yelpKey = data.match(/YELP_API_KEY=(.*)/)?.[1]?.trim();

  console.log('\n🔍 Testing API Providers...\n');
  console.log('═'.repeat(60));

  let testsRun = 0;
  let testsPassed = 0;

  // Test Google Places API
  if (googleKey && googleKey !== 'your_google_places_api_key_here') {
    testsRun++;
    console.log('\n📍 Testing Google Places API...');
    
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=plumber+in+San+Francisco&key=${googleKey}`;
    
    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          if (result.status === 'OK' || result.status === 'ZERO_RESULTS') {
            testsPassed++;
            console.log('✅ Google Places API: WORKING');
            console.log(`   - Status: ${result.status}`);
            console.log(`   - Results found: ${result.results?.length || 0}`);
          } else {
            console.log('❌ Google Places API: FAILED');
            console.log(`   - Status: ${result.status}`);
            console.log(`   - Error: ${result.error_message || 'Unknown error'}`);
          }
        } catch (e) {
          console.log('❌ Google Places API: FAILED');
          console.log(`   - Error parsing response`);
        }
        checkComplete();
      });
    }).on('error', (e) => {
      console.log('❌ Google Places API: FAILED');
      console.log(`   - Network error: ${e.message}`);
      checkComplete();
    });
  } else {
    console.log('\n⚠️  Google Places API: Not configured');
  }

  // Test Foursquare API
  if (foursquareKey && foursquareKey !== 'your_foursquare_api_key_here') {
    testsRun++;
    console.log('\n🔷 Testing Foursquare API...');
    
    const options = {
      hostname: 'api.foursquare.com',
      path: '/v3/places/search?query=plumber&near=San%20Francisco&limit=1',
      method: 'GET',
      headers: {
        'Authorization': foursquareKey,
        'Accept': 'application/json'
      }
    };

    https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(body);
            testsPassed++;
            console.log('✅ Foursquare API: WORKING');
            console.log(`   - Status: ${res.statusCode} OK`);
            console.log(`   - Results found: ${result.results?.length || 0}`);
          } catch (e) {
            console.log('❌ Foursquare API: FAILED');
            console.log(`   - Error parsing response`);
          }
        } else {
          console.log('❌ Foursquare API: FAILED');
          console.log(`   - Status: ${res.statusCode}`);
        }
        checkComplete();
      });
    }).on('error', (e) => {
      console.log('❌ Foursquare API: FAILED');
      console.log(`   - Network error: ${e.message}`);
      checkComplete();
    }).end();
  } else {
    console.log('\n⚠️  Foursquare API: Not configured');
  }

  // Test Yelp API
  if (yelpKey && yelpKey !== 'your_yelp_api_key_here') {
    testsRun++;
    console.log('\n🔴 Testing Yelp Fusion API...');
    
    const options = {
      hostname: 'api.yelp.com',
      path: '/v3/businesses/search?location=San%20Francisco&term=plumber&limit=1',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${yelpKey}`
      }
    };

    https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(body);
            testsPassed++;
            console.log('✅ Yelp Fusion API: WORKING');
            console.log(`   - Status: ${res.statusCode} OK`);
            console.log(`   - Results found: ${result.businesses?.length || 0}`);
          } catch (e) {
            console.log('❌ Yelp Fusion API: FAILED');
            console.log(`   - Error parsing response`);
          }
        } else {
          console.log('❌ Yelp Fusion API: FAILED');
          console.log(`   - Status: ${res.statusCode}`);
        }
        checkComplete();
      });
    }).on('error', (e) => {
      console.log('❌ Yelp Fusion API: FAILED');
      console.log(`   - Network error: ${e.message}`);
      checkComplete();
    }).end();
  } else {
    console.log('\n⚠️  Yelp Fusion API: Not configured');
  }

  if (testsRun === 0) {
    console.log('\n⚠️  No API keys configured!');
    console.log('\nPlease add at least one API key to .env.local:');
    console.log('  - GOOGLE_PLACES_API_KEY (recommended)');
    console.log('  - FOURSQUARE_API_KEY (free alternative)');
    console.log('  - YELP_API_KEY (legacy option)\n');
    console.log('See API_SETUP_GUIDE.md for detailed instructions.\n');
    process.exit(1);
  }

  let completedTests = 0;
  function checkComplete() {
    completedTests++;
    if (completedTests === testsRun) {
      console.log('\n' + '═'.repeat(60));
      console.log(`\n📊 Test Summary: ${testsPassed}/${testsRun} providers working\n`);
      
      if (testsPassed > 0) {
        console.log('🎉 Your Business Scraper is ready to use!');
        console.log('Run: npm run dev\n');
        process.exit(0);
      } else {
        console.log('❌ No working providers found!');
        console.log('Please check your API keys and try again.\n');
        console.log('See API_SETUP_GUIDE.md for help.\n');
        process.exit(1);
      }
    }
  }
});





