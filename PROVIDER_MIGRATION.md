# 🔄 Provider Migration Guide

## What Changed?

Your Business Scraper now supports **multiple API providers**! You can now choose between:
- **Google Places API** (Recommended - most comprehensive data)
- **Foursquare API** (Free alternative - no credit card)
- **Yelp Fusion API** (Legacy - may have access issues)

## Why the Change?

The Yelp API was experiencing login and access issues. We've added alternative providers so you can:
- ✅ Continue generating leads without interruption
- ✅ Choose the best provider for your needs
- ✅ Switch providers easily in the UI
- ✅ Use multiple providers for redundancy

## Quick Start

### Step 1: Choose Your Provider

**Recommended: Google Places API**
- Most accurate and comprehensive data
- Best phone number coverage
- ~40,000 searches/month free
- Requires credit card (but free tier is generous)

**Alternative: Foursquare API**
- 1,000 searches/day free
- No credit card required
- Good data coverage
- Easy setup

### Step 2: Get Your API Key

Follow the detailed instructions in [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md)

**Quick Links:**
- [Google Places](https://console.cloud.google.com/google/maps-apis/)
- [Foursquare](https://foursquare.com/developers/signup)
- [Yelp](https://www.yelp.com/developers/v3/manage_app)

### Step 3: Update .env.local

Create or update your `.env.local` file:

```bash
# Add at least ONE of these:
GOOGLE_PLACES_API_KEY=your_google_key
FOURSQUARE_API_KEY=your_foursquare_key
YELP_API_KEY=your_yelp_key
```

See [ENV_EXAMPLE.md](./ENV_EXAMPLE.md) for the complete template.

### Step 4: Test Your Setup

```bash
npm run test-providers
```

This will test all configured providers and confirm they're working.

### Step 5: Start Searching!

```bash
npm run dev
```

Open http://localhost:3000 and select your provider from the dropdown.

## What's New in the UI?

### Provider Selection Dropdown
At the top of the search form, you'll now see a "Data Source" dropdown where you can select:
- Google Places (Recommended)
- Foursquare
- Yelp Fusion

### Provider Information
Each provider displays:
- Name and recommendation status
- Brief description
- API key requirements in the help text

### Results Display
After searching, you'll see which provider was used for the results.

## Migration from Yelp-Only

If you were using only Yelp before:

1. **Keep your existing Yelp key** in `.env.local` (it will still work)
2. **Add a new provider** (Google or Foursquare recommended)
3. **Test both providers** with `npm run test-providers`
4. **Switch to the new provider** in the UI if you prefer

Your old searches and exports will continue to work exactly the same way.

## API Comparison

| Feature | Google Places | Foursquare | Yelp |
|---------|--------------|------------|------|
| **Setup Difficulty** | Medium | Easy | Easy |
| **Credit Card Required** | Yes | No | No |
| **Free Searches/Day** | ~1,300 | 1,000 | 5,000 |
| **Phone Number Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Data Accuracy** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Business Coverage** | Excellent | Good | Good |
| **Best For** | Professional | Free tier | High volume |

## Technical Changes

### New Files
- `lib/providers/google-places.ts` - Google Places provider
- `lib/providers/foursquare.ts` - Foursquare provider
- `lib/providers/yelp.ts` - Yelp provider (refactored)
- `scripts/test-providers.js` - Multi-provider test script
- `API_SETUP_GUIDE.md` - Comprehensive setup guide
- `ENV_EXAMPLE.md` - Environment variables reference

### Modified Files
- `app/api/scrape/route.ts` - Multi-provider routing
- `lib/validators.ts` - Added provider field
- `components/shared/business-search-form.tsx` - Provider selection UI
- `app/page.tsx` - Provider display in results
- `README.md` - Updated documentation

### Breaking Changes
**None!** The API is fully backward compatible. If you don't specify a provider, it defaults to Google Places.

## Troubleshooting

### "API key not configured" error
- Check your `.env.local` file exists
- Ensure the API key variable name matches exactly
- Restart your dev server after adding keys

### Provider selection not showing
- Clear your browser cache
- Restart the dev server
- Check browser console for errors

### "No businesses found" error
- Try switching to a different provider
- Check your search location is valid
- Verify your API key is active

### All providers failing
- Run `npm run test-providers` to diagnose
- Check API key validity
- Verify you haven't exceeded rate limits

## Support

For detailed setup instructions, see:
- [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md) - Step-by-step provider setup
- [ENV_EXAMPLE.md](./ENV_EXAMPLE.md) - Environment variables template
- [README.md](./README.md) - General documentation

## Next Steps

1. ✅ Read [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md)
2. ✅ Choose your provider(s)
3. ✅ Get your API key(s)
4. ✅ Update `.env.local`
5. ✅ Run `npm run test-providers`
6. ✅ Start searching with `npm run dev`

Happy lead generation! 🚀





