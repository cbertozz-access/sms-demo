# Builder.io Handoff for SMS Demo

## Overview

This is a handoff document for Claude Code running in Builder.io to build pages and configure the CMS for the SMS Demo project.

**Live Site:** https://sms-demo-orcin.vercel.app
**GitHub:** https://github.com/cbertozz-access/sms-demo
**Builder.io Space API Key:** `286fbab6792c4f4f86cd9ec36393ea60`

---

## 1. Project Purpose

An **Offhire SMS notification system** that:
- Uploads customer lists to Iterable
- Creates new lists for each upload
- Enables SMS campaigns for vehicle offhire notifications

---

## 2. Registered Custom Components

These React components are registered with Builder.io and available for drag-and-drop:

### `ListUploader`
- **Purpose:** CSV upload form for adding users to Iterable
- **Inputs:** None (self-contained)
- **Features:**
  - List name input (auto-generates timestamp-based name)
  - CSV file picker
  - Preview table (shows first 10 rows)
  - Upload button → calls `/api/upload-list`
  - Template download link

### `JourneyFlowchart`
- **Purpose:** Visual flowchart showing the offhire SMS journey
- **Inputs:**
  - `currentStep` (string enum): Which step to highlight
    - `offhire-request`
    - `scheduled-sms`
    - `wait-confirmation`
    - `wait-return`
    - `reminder-sms`
    - `vehicle-returned`
    - `complete-sms`
    - `complete`

---

## 3. Theme System (Design Tokens)

The project uses CSS variables for theming, matching the CLG project pattern.

### Available Brands

| Brand ID | Name | Primary Color |
|----------|------|---------------|
| `access-hire` | Access Hire Australia | Red (#E31937) |
| `access-express` | Access Express | Navy (#0A1628) |
| `default` | SMS Demo | Blue (#2563EB) |

### CSS Variables Available

```css
/* Brand Scale */
--color-brand-50 through --color-brand-950

/* Semantic Colors */
--color-primary
--color-primary-hover
--color-primary-foreground
--color-secondary
--color-secondary-hover
--color-secondary-foreground
--color-accent
--color-accent-foreground

/* Backgrounds */
--color-background
--color-background-alt
--color-card
--color-card-foreground
--color-header
--color-header-foreground
--color-footer
--color-footer-foreground

/* Text */
--color-foreground
--color-muted-foreground

/* Borders */
--color-border
--color-input
--color-ring

/* Status */
--color-success / --color-success-hover
--color-warning
--color-error / --color-error-hover

/* Typography */
--font-heading
--font-body
--font-mono

/* Spacing */
--radius
--radius-sm
--radius-lg
```

### Using Theme Colors in Builder.io

When styling in Builder.io, use CSS variable syntax:

```
Background: var(--color-primary)
Text Color: var(--color-foreground)
Border: 1px solid var(--color-border)
Border Radius: var(--radius)
```

---

## 4. Page Structure to Build

### Page: `/` (Home)
**Purpose:** Landing page with navigation to demo

**Layout:**
```
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Logo (left)                           │
│ - Title: "SMS Demo - Offhire"           │
├─────────────────────────────────────────┤
│ HERO SECTION                            │
│ - Headline: "Offhire SMS Notifications" │
│ - Subhead: Brief description            │
│ - CTA Button → /demo                    │
├─────────────────────────────────────────┤
│ FEATURES (3-column grid)                │
│ - Upload Lists                          │
│ - Iterable Integration                  │
│ - Automated Journeys                    │
├─────────────────────────────────────────┤
│ FOOTER                                  │
│ - Brand footer with links               │
└─────────────────────────────────────────┘
```

**Styling:**
- Header: `bg: var(--color-header)`, `color: var(--color-header-foreground)`
- Hero: `bg: var(--color-background-alt)`
- CTA Button: `bg: var(--color-primary)`, `hover: var(--color-primary-hover)`
- Footer: `bg: var(--color-footer)`, `color: var(--color-footer-foreground)`

### Page: `/demo` (Already exists as React page)
This page is hardcoded in Next.js. Builder.io can create an alternative at `/offhire` if needed.

### Page: `/offhire` (Builder.io version)
**Purpose:** Alternative demo page built in Builder.io

**Layout:**
```
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ - Title: "Offhire SMS Demo"             │
│ - Back link → /                         │
├─────────────────────────────────────────┤
│ TWO-COLUMN LAYOUT                       │
│ ┌───────────────┬─────────────────────┐ │
│ │ ListUploader  │ JourneyFlowchart    │ │
│ │ (component)   │ (component)         │ │
│ │               │                     │ │
│ │               │ Info Box:           │ │
│ │               │ "How it works"      │ │
│ │               │ 1. Upload CSV       │ │
│ │               │ 2. List created     │ │
│ │               │ 3. Users upserted   │ │
│ │               │ 4. Trigger campaign │ │
│ └───────────────┴─────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 5. Data Model: Brand Theme (Optional)

If you want to make themes editable in Builder.io, create a Data Model:

**Model Name:** `brand-theme`

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | Text | Brand identifier (e.g., "access-hire") |
| `name` | Text | Display name |
| `primaryColor` | Color | Primary brand color |
| `primaryHoverColor` | Color | Hover state |
| `secondaryColor` | Color | Secondary color |
| `backgroundColor` | Color | Page background |
| `headerColor` | Color | Header background |
| `footerColor` | Color | Footer background |
| `headingFont` | Text | Font family for headings |
| `bodyFont` | Text | Font family for body |
| `logoUrl` | File | Brand logo |

---

## 6. API Endpoints

### POST `/api/upload-list`
**Purpose:** Upload users to Iterable and create a new list

**Request:**
```json
{
  "listName": "Offhire_2024-01-30_120000",
  "users": [
    {
      "email": "john@example.com",
      "phone": "+15551234567",
      "customerName": "John Doe",
      "contractId": "C-12345",
      "vehicleMake": "Toyota",
      "vehicleModel": "Camry",
      "pickupLocation": "LAX Airport",
      "returnDate": "2024-02-01"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Created list \"Offhire_2024-01-30\" with 1 users",
  "listId": 12345
}
```

---

## 7. Environment Variables (Already Set in Vercel)

| Variable | Description |
|----------|-------------|
| `AUTH_USER` | Basic auth username (demo) |
| `AUTH_PASSWORD` | Basic auth password |
| `NEXT_PUBLIC_BUILDER_API_KEY` | Builder.io public key |
| `ITERABLE_API_KEY` | Iterable API key |

---

## 8. Fonts Loaded

The following Google Fonts are loaded and available:

| Font | CSS Variable | Use For |
|------|--------------|---------|
| Lato | `--font-lato` | Access Hire headings |
| Roboto | `--font-roboto` | Access Hire body |
| Montserrat | `--font-montserrat` | Access Express headings |
| Open Sans | `--font-open-sans` | Access Express body |

---

## 9. Builder.io Setup Checklist

- [ ] Create `page` model (if not exists)
- [ ] Register custom components (auto-registered via SDK)
- [ ] Create home page at `/`
- [ ] Create offhire page at `/offhire` (optional)
- [ ] Set up brand theme data model (optional)
- [ ] Configure preview URL: `https://sms-demo-orcin.vercel.app`

---

## 10. Component Usage Examples

### Using ListUploader in Builder.io
1. Drag "ListUploader" component onto canvas
2. No configuration needed - it's self-contained
3. Style the container as needed

### Using JourneyFlowchart in Builder.io
1. Drag "JourneyFlowchart" component onto canvas
2. Set `currentStep` to highlight a step:
   - Use `offhire-request` for the first step
   - Use `complete` for the final step
3. Component auto-styles based on theme

---

## 11. Testing

**Local preview:** Run `npm run dev` in the sms-demo repo

**Production:** https://sms-demo-orcin.vercel.app

**Auth:** `demo` / `demo123`

---

## Questions?

This handoff covers the full spec. The Builder.io Claude Code session should be able to:
1. Create pages using the registered components
2. Style using CSS variables for theme consistency
3. Build a home page and any additional pages needed
