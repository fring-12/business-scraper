# API Setup Guide - Business Scraper

This guide will help you set up API keys for different data providers. You can use any ONE of these providers, or set up multiple for flexibility.

---

## 🎯 Quick Recommendation

**Start with Google Places API** - It provides the most comprehensive and accurate business data, including verified phone numbers.

---

## 🔑 Option 1: Google Places API (RECOMMENDED)

### Features
- ✅ Most comprehensive business data
- ✅ Highly accurate phone numbers
- ✅ Detailed address information
- ✅ Best for US businesses
- ⚠️ Requires credit card (but has generous free tier)

### Free Tier
- **$200 free credit per month**
- Approximately **40,000+ searches per month free**
- More than enough for lead generation

### Setup Steps

#### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

#### 2. Create a New Project (if needed)
- Click "Select a project" at the top
- Click "New Project"
- Name it "Business Scraper" and click "Create"

#### 3. Enable Places API
- Go to "APIs & Services" > "Library"
- Search for "Places API"
- Click on "Places API" and click "Enable"
- Also enable "Places API (New)" for better results

#### 4. Create API Key
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "API Key"
- Copy your API key

#### 5. Secure Your API Key (IMPORTANT)
- Click on your newly created API key
- Under "API restrictions", select "Restrict key"
- Select "Places API" from the list
- Click "Save"

#### 6. Enable Billing (Required)
- Go to "Billing" in the menu
- Link a credit card (you won't be charged unless you exceed $200/month)
- Set up budget alerts to monitor usage

#### 7. Add to .env.local
```bash
GOOGLE_PLACES_API_KEY=YOUR_API_KEY_HERE
```

---

## 🔑 Option 2: Foursquare API (Good Alternative)

### Features
- ✅ Good business data coverage
- ✅ Free tier with no credit card
- ✅ 1,000 calls per day free
- ✅ Easy to set up

### Free Tier
- **1,000 API calls per day**
- No credit card required
- ~30,000 searches per month

### Setup Steps

#### 1. Sign Up
Visit: https://foursquare.com/developers/signup

#### 2. Create an Account
- Use your email to sign up
- Verify your email address

#### 3. Create a New Project
- Log in to the Foursquare Developer Portal
- Click "Create a New Project"
- Name it "Business Scraper"

#### 4. Get Your API Key
- Once project is created, click on it
- Copy your API Key (it will start with "fsq_")

#### 5. Add to .env.local
```bash
FOURSQUARE_API_KEY=YOUR_API_KEY_HERE
```

---

## 🔑 Option 3: Yelp Fusion API (Legacy Option)

### Features
- ✅ 5,000 calls per day
- ✅ No credit card required
- ⚠️ May have login/access issues (as reported)
- ⚠️ Limited phone number availability

### Free Tier
- **5,000 API calls per day**
- ~150,000 searches per month

### Setup Steps

#### 1. Go to Yelp Developers
Visit: https://www.yelp.com/developers/v3/manage_app

#### 2. Log In or Sign Up
- Use your Yelp account or create a new one
- Complete the developer registration

#### 3. Create a New App
- Click "Create New App"
- Fill in the form:
  - App Name: "Business Scraper"
  - Industry: "Business Services"
  - Contact Email: Your email
- Accept terms and click "Create New App"

#### 4. Get Your API Key
- Once created, you'll see your API Key
- Click "Show" to reveal the full key
- Copy the API Key

#### 5. Add to .env.local
```bash
YELP_API_KEY=YOUR_API_KEY_HERE
```

---

## 📋 Setup Your .env.local File

1. **Copy the example file:**
```bash
cp .env.local.example .env.local
```

2. **Edit .env.local and add your API key(s):**
```bash
# Use ONE or ALL of these (you can switch in the UI)
GOOGLE_PLACES_API_KEY=your_actual_google_key
FOURSQUARE_API_KEY=your_actual_foursquare_key
YELP_API_KEY=your_actual_yelp_key
```

3. **Test your API connection:**
```bash
npm run test-api
```

---

## 🧪 Testing Your Setup

### Test API Connection
```bash
npm run test-api
```

This script will check if your API keys are working correctly.

### Start Development Server
```bash
npm run dev
```

Then open http://localhost:3000 and try a search!

---

## 💡 Which Provider Should I Choose?

### Choose **Google Places** if:
- ✅ You want the most accurate and comprehensive data
- ✅ You need verified phone numbers
- ✅ You can provide a credit card (free tier is generous)
- ✅ You're serious about lead generation

### Choose **Foursquare** if:
- ✅ You want a free option with no credit card
- ✅ You need moderate data coverage
- ✅ 1,000 searches per day is enough for you

### Choose **Yelp** if:
- ✅ You already have a working Yelp account
- ✅ You need high volume (5,000 calls/day)
- ⚠️ You can work around login issues

---

## 🎯 Recommended Strategy

**For Best Results:**
1. Start with **Google Places API** (most comprehensive)
2. Add **Foursquare** as a backup (free, no card)
3. Configure both in your `.env.local`
4. Switch between them in the UI as needed

**For Free Option:**
1. Use **Foursquare** (1,000 calls/day free)
2. Add **Yelp** if you can access it (5,000 calls/day)

---

## 🔧 Troubleshooting

### "API key not configured" error
- Make sure your `.env.local` file exists
- Check that the API key variable name matches exactly
- Restart your dev server after adding keys

### "Invalid API key" error
- Verify you copied the entire API key
- Check for extra spaces or quotes
- Make sure the API is enabled in your provider's console

### Google Places "REQUEST_DENIED" error
- Enable billing in Google Cloud Console
- Make sure "Places API" is enabled
- Check your API key restrictions

### Foursquare errors
- Verify your API key starts with "fsq_"
- Check that your project is active
- Ensure you're not exceeding rate limits

### Can't log in to Yelp
- Try clearing browser cookies
- Use Google/Facebook login instead
- Or switch to Google Places or Foursquare instead

---

## 📊 API Comparison

| Feature | Google Places | Foursquare | Yelp |
|---------|--------------|------------|------|
| **Free Tier** | $200/month (~40K searches) | 1K/day | 5K/day |
| **Phone Numbers** | ✅ Excellent | ✅ Good | ⚠️ Limited |
| **Data Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Credit Card** | Required | Not required | Not required |
| **Setup Difficulty** | Medium | Easy | Easy |
| **Best For** | Professional use | Free option | High volume |

---

## 🎉 You're Ready!

Once you've added at least one API key:

1. Run `npm run dev`
2. Open http://localhost:3000
3. Select your provider from the dropdown
4. Start searching for businesses!

Happy lead generation! 🚀





