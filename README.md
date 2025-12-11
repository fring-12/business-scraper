# Business Scraper - Home Services Lead Generation

A Next.js application for scraping legitimate home service business data from the US using free APIs. Perfect for generating leads for AI voice assistant sales.

## Features

- 🔍 Search businesses by location, category, and keywords
- 📞 Get phone numbers and business details
- 📊 Export results to CSV
- 🎨 Modern UI with TailwindCSS and Shadcn/ui
- ⚡ Built with Next.js 15 and React 19
- 🔒 Type-safe with TypeScript and Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Yelp Fusion API Key (free - get from https://www.yelp.com/developers/v3/manage_app)

### Installation

1. Clone and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Yelp API key:

```
YELP_API_KEY=your_actual_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a location (city, state, or ZIP code)
2. Select or enter a business category (e.g., "plumbing", "hvac", "electrician")
3. Click "Search Businesses"
4. View results with phone numbers and details
5. Export to CSV for your cold calling campaign

## API Configuration

### Yelp Fusion API (Recommended - Free)

1. Go to https://www.yelp.com/developers/v3/manage_app
2. Create a new app
3. Copy your API Key
4. Add it to `.env.local`

**Free Tier Limits:** 5,000 API calls per day

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

