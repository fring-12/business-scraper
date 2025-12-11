# Business Scraper - Home Services Lead Generation

A Next.js application for scraping legitimate home service business data from the US using multiple API providers. Perfect for generating leads for AI voice assistant sales.

## Features

- 🔍 Search businesses by location, category, and keywords
- 🌐 **Multiple API providers** (Google Places, Foursquare, Yelp)
- 📞 Get verified phone numbers and business details
- 📊 Export results to CSV
- 🎨 Modern UI with TailwindCSS and Shadcn/ui
- ⚡ Built with Next.js 15 and React 19
- 🔒 Type-safe with TypeScript and Zod validation
- 🔄 Easy provider switching in the UI

## Getting Started

### Prerequisites

- Node.js 18+ installed
- At least ONE API key from the providers below

### Installation

1. Clone and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
```

3. Add at least ONE API key to `.env.local`:

```bash
# Recommended: Google Places (most comprehensive data)
GOOGLE_PLACES_API_KEY=your_google_api_key

# Alternative: Foursquare (1,000 free calls/day, no credit card)
FOURSQUARE_API_KEY=your_foursquare_api_key

# Alternative: Yelp (5,000 free calls/day, may have login issues)
YELP_API_KEY=your_yelp_api_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select a data source** (Google Places, Foursquare, or Yelp)
2. Enter a location (city, state, or ZIP code)
3. Select or enter a business category (e.g., "plumbing", "hvac", "electrician")
4. Adjust search parameters (set limit to 50 for maximum results)
5. Click "Search Businesses"
6. View results with phone numbers and details
7. Export to CSV for your cold calling campaign

> 💡 **Getting 1000+ Leads:** See [LEAD_GENERATION_STRATEGY.md](./LEAD_GENERATION_STRATEGY.md) for a complete guide on generating large lead lists by searching multiple cities.

## API Providers

### 🌟 Google Places API (RECOMMENDED)

**Best for:** Most comprehensive and accurate data

- ✅ Most verified phone numbers
- ✅ Detailed business information
- ✅ ~40,000 searches/month free ($200 credit)
- ⚠️ Requires credit card

**Get API Key:** https://console.cloud.google.com/google/maps-apis/

### 🔷 Foursquare API

**Best for:** Free alternative with no credit card

- ✅ 1,000 calls per day free
- ✅ Good data coverage
- ✅ No credit card required
- ✅ Easy setup

**Get API Key:** https://foursquare.com/developers/signup

### 🔴 Yelp Fusion API

**Best for:** High volume searches

- ✅ 5,000 calls per day free
- ⚠️ May have login/access issues
- ⚠️ Limited phone numbers

**Get API Key:** https://www.yelp.com/developers/v3/manage_app

> 📖 **For detailed setup instructions, see [API_SETUP_GUIDE.md](./API_SETUP_GUIDE.md)**

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Styling:** TailwindCSS 4
- **Components:** Shadcn/ui + Radix UI
- **Forms:** React Hook Form + Zod
- **Type Safety:** TypeScript
- **HTTP Client:** Axios

## Project Structure

```
business-scraper/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── scrape/        # Business scraping endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── shared/            # Reusable components
│   │   ├── business-search-form.tsx
│   │   ├── business-results.tsx
│   │   └── export-button.tsx
│   └── ui/                # Shadcn/ui components
├── lib/
│   ├── utils.ts           # Utility functions
│   └── validators.ts      # Zod schemas
└── types/
    └── business.ts        # TypeScript interfaces

```

## License

MIT

