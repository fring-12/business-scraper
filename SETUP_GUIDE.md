# Business Scraper - Complete Setup Guide

## 🚀 Quick Start

Your business scraper application is ready! Follow these simple steps to get it running.

### Step 1: Get Your Free Yelp API Key

1. **Create a Yelp Account** (if you don't have one):
   - Go to: https://www.yelp.com/signup

2. **Create a Yelp Fusion App**:
   - Visit: https://www.yelp.com/developers/v3/manage_app
   - Click "Create New App"
   - Fill in the form:
     - **App Name:** Business Scraper (or any name)
     - **Industry:** Technology
     - **Contact Email:** Your email
     - **Description:** Lead generation for AI voice assistant
   - Accept the terms and click "Create New App"

3. **Get Your API Key**:
   - After creating the app, you'll see your **API Key** on the app page
   - Copy this API key

### Step 2: Configure Your API Key

1. Open the `.env.local` file in your project root
2. Replace the empty `YELP_API_KEY=` with your actual API key:

```bash
YELP_API_KEY=your_actual_api_key_here
```

**Important:** Keep this file private and never commit it to version control!

### Step 3: Run the Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

### Step 4: Start Scraping!

1. Open http://localhost:3000 in your browser
2. Enter a location (e.g., "New York, NY" or "90210")
3. Select a business category (e.g., "Plumber", "Electrician", "HVAC")
4. Click "Search Businesses"
5. View results and export to CSV

## 📊 API Usage Limits

**Yelp Fusion API Free Tier:**
- ✅ **5,000 API calls per day** (completely free)
- ✅ Up to 50 results per search
- ✅ No credit card required

**Pro Tip:** Each search counts as 1 API call. You can get up to 5,000 searches per day for free!

## 🎯 Best Practices for Lead Generation

### Recommended Search Parameters:

1. **For Local Markets:**
   - Location: Specific city + state (e.g., "Austin, TX")
   - Radius: 8,000 meters (default - about 5 miles)
   - Limit: 20-50 results per search

2. **For Broader Coverage:**
   - Location: ZIP code (e.g., "10001")
   - Multiple searches with different ZIP codes
   - Focus on suburban areas with more home services

3. **Best Home Service Categories:**
   - Plumber / Plumbing
   - Electrician / Electrical Services
   - HVAC / Air Conditioning
   - Landscaping / Lawn Care
   - Roofing / Roofer
   - Painting / Painter
   - Carpentry / Carpenter
   - Cleaning Services / House Cleaning
   - Pest Control
   - Garage Door Services
   - Pool Services
   - Tree Services

### Building Your Lead List:

1. **Search Multiple Locations:**
   ```
   - Search: "Miami, FL" → Export CSV
   - Search: "Tampa, FL" → Export CSV
   - Search: "Orlando, FL" → Export CSV
   ```

2. **Cover Different Services:**
   ```
   - "Plumber" in "Los Angeles, CA"
   - "Electrician" in "Los Angeles, CA"
   - "HVAC" in "Los Angeles, CA"
   ```

3. **Combine Your CSVs:**
   - Import all CSV files into Excel or Google Sheets
   - Remove duplicates
   - Sort by rating and review count
   - Prioritize businesses with 4+ stars

## 🔧 Troubleshooting

### "API key not configured" Error
- Make sure you created `.env.local` file
- Check that `YELP_API_KEY=` has your actual API key (no spaces)
- Restart the development server after adding the key

### "No businesses found" Error
- Try a broader location (use city + state instead of specific address)
- Check spelling of location and category
- Increase search radius (try 20000 meters)
- Use different search terms (e.g., "plumbing" instead of "plumber")

### "API rate limit exceeded" Error
- You've exceeded 5,000 calls today
- Wait until tomorrow (resets at midnight UTC)
- Or upgrade to Yelp API paid plan (rarely needed)

## 📁 Project Structure

```
business-scraper/
├── app/
│   ├── api/scrape/route.ts    # API endpoint for scraping
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── shared/
│   │   ├── business-search-form.tsx
│   │   ├── business-results.tsx
│   │   └── export-button.tsx
│   └── ui/                     # Shadcn/ui components
├── lib/
│   ├── utils.ts                # Utility functions
│   └── validators.ts           # Zod schemas
├── types/
│   └── business.ts             # TypeScript types
├── .env.local                  # API keys (keep private!)
└── package.json                # Dependencies
```

## 🎨 Features

✅ Modern, responsive UI with TailwindCSS
✅ Type-safe with TypeScript
✅ Form validation with React Hook Form + Zod
✅ Real-time search with loading states
✅ Export results to CSV
✅ Formatted phone numbers
✅ Business ratings and reviews
✅ Distance calculation
✅ Error handling and user feedback

## 🚀 Production Deployment

### Deploy to Vercel (Recommended):

1. Push your code to GitHub (don't include `.env.local`)
2. Go to https://vercel.com and sign in
3. Click "New Project" and import your repository
4. Add environment variable:
   - Key: `YELP_API_KEY`
   - Value: Your Yelp API key
5. Click "Deploy"

Your app will be live at: `https://your-app-name.vercel.app`

## 📞 Using Your Lead Data

Once you export your CSV:

1. **Import to CRM:** Use with HubSpot, Salesforce, etc.
2. **Cold Calling Software:** Import to dialers like Aircall, RingCentral
3. **AI Voice Assistant:** Feed data to your voice assistant system
4. **Email Campaigns:** Extract emails (when available) for outreach

## 🔐 Legal & Compliance

**Important Reminders:**

- ✅ All data is from publicly available business listings
- ✅ Comply with TCPA regulations for cold calling
- ✅ Respect Do Not Call (DNC) registries
- ✅ Follow CAN-SPAM Act for email outreach
- ✅ Use data responsibly and ethically

## 💡 Next Steps

1. **Test Your Setup:**
   - Search for "plumber" in your city
   - Verify phone numbers are displaying correctly
   - Export a test CSV file

2. **Build Your Lead List:**
   - Create a spreadsheet of target locations
   - Systematically search each location + category combination
   - Organize exported CSVs by region/service type

3. **Optimize Your Workflow:**
   - Set daily goals (e.g., 500 leads per day)
   - Track which regions have best results
   - Focus on high-rated businesses (4+ stars)

## 🆘 Need Help?

- Review the README.md file
- Check Yelp Fusion API documentation: https://docs.developer.yelp.com/
- Verify your API key at: https://www.yelp.com/developers/v3/manage_app

## 🎉 Success!

You're now ready to generate high-quality leads for your AI voice assistant business. Happy scraping! 🚀

