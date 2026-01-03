# Environment Variables Example

Copy this content to a new file named `.env.local` in your project root:

```bash
# Business Scraper - API Keys Configuration
# ==============================================
# Choose ONE or MORE providers (you can switch between them in the UI)
# ==============================================

# ============================================== 
# GOOGLE PLACES API (RECOMMENDED)
# ==============================================
# Get your API key at: https://console.cloud.google.com/google/maps-apis/
# Free tier: $200 credit per month (~40,000 searches)
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here

# ==============================================
# FOURSQUARE API (GOOD ALTERNATIVE)
# ==============================================
# Get your API key at: https://foursquare.com/developers/signup
# Free tier: 1,000 calls per day (no credit card required)
FOURSQUARE_API_KEY=your_foursquare_api_key_here

# ==============================================
# YELP FUSION API (LEGACY OPTION)
# ==============================================
# Get your API key at: https://www.yelp.com/developers/v3/manage_app
# Free tier: 5,000 calls per day (no credit card required)
YELP_API_KEY=your_yelp_api_key_here
```

## Quick Start

1. Create `.env.local` file in project root
2. Copy the content above
3. Replace at least ONE `your_*_api_key_here` with your actual API key
4. Save the file
5. Restart your development server

## Notes
- You only need ONE API key to start
- Google Places provides the most comprehensive data (recommended)
- Foursquare is a good free alternative (no credit card needed)
- You can configure multiple providers and switch between them in the UI







