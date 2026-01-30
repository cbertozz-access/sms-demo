# SMS Demo - Hire Contract Notifications

A production SMS notification system for hire contracts, built with:
- **Builder.io** for visual page editing
- **Vercel** for hosting + serverless API
- **Iterable** for SMS delivery
- **Basic Auth** for password protection (via Edge Middleware)

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Builder.io    │     │     Vercel      │     │    Iterable     │
│  (Visual CMS)   │────▶│   (Next.js)     │────▶│   (SMS API)     │
│                 │     │                 │     │                 │
│  - Page layouts │     │  - Edge Auth    │     │  - Send SMS     │
│  - Form fields  │     │  - API routes   │     │  - Templates    │
│  - SMS previews │     │  - Env vars     │     │  - Tracking     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `AUTH_USER` | Basic auth username | You choose |
| `AUTH_PASSWORD` | Basic auth password | You choose |
| `NEXT_PUBLIC_BUILDER_API_KEY` | Builder.io public key | Builder.io → Settings → API |
| `ITERABLE_API_KEY` | Iterable API key | Iterable → Integrations → API Keys |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be prompted for Basic Auth credentials.

Default credentials: `demo` / `demo123`

## Project Structure

```
sms-demo/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── send-sms/
│   │   │       └── route.ts      # Iterable SMS endpoint
│   │   ├── [[...page]]/
│   │   │   └── page.tsx          # Builder.io catch-all
│   │   ├── demo/
│   │   │   └── page.tsx          # Interactive demo page
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ContractDataForm.tsx   # Customer/contract input fields
│   │   ├── SMSTemplateEditor.tsx  # Editable SMS templates with merge fields
│   │   ├── SMSPreview.tsx         # Live preview with character count
│   │   ├── JourneyFlowchart.tsx   # Visual workflow diagram
│   │   ├── builder-content.tsx    # Builder.io renderer
│   │   └── builder-registry.tsx   # Builder.io component registration
│   ├── lib/
│   │   ├── builder.ts            # Builder.io setup
│   │   └── iterable.ts           # Iterable API client
│   └── middleware.ts             # Basic Auth
├── .env.local                    # Local env vars
├── .env.example                  # Example env vars
└── README.md
```

## Features

### Interactive SMS Demo (`/demo`)
- Fill in contract details
- Edit SMS templates with merge fields
- Live preview with character count
- Send test SMS via Iterable API
- Visual journey flowchart

### Builder.io Integration
- Visual page editing
- Drag-and-drop components
- Custom components registered:
  - `ContractDataForm`
  - `SMSTemplateEditor`
  - `SMSPreview`
  - `JourneyFlowchart`

### Basic Auth Protection
All routes are protected by Basic Auth via Edge Middleware.

## Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial SMS demo"
gh repo create sms-demo --public --push

# Deploy via Vercel CLI
vercel
```

### Configure Environment Variables in Vercel

In your Vercel dashboard, add:
- `AUTH_USER`
- `AUTH_PASSWORD`
- `NEXT_PUBLIC_BUILDER_API_KEY`
- `ITERABLE_API_KEY`

## API Reference

### POST `/api/send-sms`

Send an SMS via Iterable.

**Request Body:**
```json
{
  "phone": "+1234567890",
  "message": "Your SMS message here",
  "dataFields": {
    "customerName": "John",
    "contractId": "C-12345"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "SMS sent successfully"
}
```

## Notes

- Iterable requires phone numbers in E.164 format (+1...)
- Builder.io free tier allows 1 space with unlimited pages
- Basic Auth credentials should be shared securely with authorized users
- SMS character limit: 160 chars (GSM-7) or 70 chars (Unicode)
