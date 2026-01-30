/**
 * Brand Theme Definitions
 *
 * Each brand gets a complete theme object.
 * Add new brands here - they will automatically be available in Builder.io.
 */

import type { BrandTheme } from "./types";

// ============================================
// BRAND DEFINITIONS
// ============================================

export const brands: Record<string, BrandTheme> = {
  // Brand 1: Access Hire Australia (Primary Brand)
  "access-hire": {
    id: "access-hire",
    name: "Access Hire Australia",
    colors: {
      brand: {
        50: "rgb(255 229 233)",
        100: "rgb(255 204 211)",
        200: "rgb(255 160 170)",
        300: "rgb(255 109 127)",
        400: "rgb(245 60 89)",
        500: "rgb(227 25 55)",
        600: "rgb(193 21 47)",
        700: "rgb(161 18 40)",
        800: "rgb(132 16 32)",
        900: "rgb(94 11 23)",
        950: "rgb(94 11 23)",
      },
      primary: "rgb(227 25 55)",
      primaryHover: "rgb(132 16 32)",
      primaryForeground: "rgb(255 229 233)",
      secondary: "rgb(30 41 59)",
      secondaryHover: "rgb(15 23 42)",
      secondaryForeground: "rgb(248 250 252)",
      accent: "rgb(30 41 59)",
      accentForeground: "rgb(255 255 255)",
      background: "rgb(255 255 255)",
      backgroundAlt: "rgb(249 250 251)",
      card: "rgb(255 255 255)",
      cardForeground: "rgb(15 23 42)",
      header: "rgb(255 255 255)",
      headerForeground: "rgb(15 23 42)",
      footer: "rgb(227 25 55)",
      footerForeground: "rgb(255 255 255)",
      foreground: "rgb(15 23 42)",
      mutedForeground: "rgb(100 116 139)",
      border: "rgb(226 232 240)",
      input: "rgb(226 232 240)",
      ring: "rgb(227 25 55)",
      success: "rgb(34 197 94)",
      successHover: "rgb(22 163 74)",
      warning: "rgb(245 158 11)",
      error: "rgb(239 68 68)",
      errorHover: "rgb(220 38 38)",
    },
    fonts: {
      heading: "'Lato', system-ui, sans-serif",
      body: "'Roboto', system-ui, sans-serif",
      mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace",
    },
    spacing: {
      radius: "8px",
      radiusSm: "4px",
      radiusLg: "12px",
    },
    assets: {
      logoUrl: "/images/brand/access-hire-logo.webp",
      logoUrlDark: "/images/brand/access-hire-logo-white.webp",
    },
  },

  // Brand 2: Access Express
  "access-express": {
    id: "access-express",
    name: "Access Express",
    colors: {
      brand: {
        50: "rgb(232 242 250)",
        100: "rgb(192 216 236)",
        200: "rgb(138 176 212)",
        300: "rgb(90 132 176)",
        400: "rgb(58 100 144)",
        500: "rgb(35 74 114)",
        600: "rgb(26 58 92)",
        700: "rgb(18 42 74)",
        800: "rgb(13 30 54)",
        900: "rgb(10 22 40)",
        950: "rgb(5 12 20)",
      },
      primary: "rgb(10 22 40)",
      primaryHover: "rgb(18 42 74)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(245 166 35)",
      secondaryHover: "rgb(212 144 30)",
      secondaryForeground: "rgb(255 255 255)",
      accent: "rgb(0 168 232)",
      accentForeground: "rgb(255 255 255)",
      background: "rgb(255 255 255)",
      backgroundAlt: "rgb(250 250 250)",
      card: "rgb(255 255 255)",
      cardForeground: "rgb(38 38 38)",
      header: "rgb(10 22 40)",
      headerForeground: "rgb(255 255 255)",
      footer: "rgb(10 22 40)",
      footerForeground: "rgb(255 255 255)",
      foreground: "rgb(38 38 38)",
      mutedForeground: "rgb(115 115 115)",
      border: "rgb(229 229 229)",
      input: "rgb(212 212 212)",
      ring: "rgb(0 168 232)",
      success: "rgb(34 197 94)",
      successHover: "rgb(22 163 74)",
      warning: "rgb(245 158 11)",
      error: "rgb(239 68 68)",
      errorHover: "rgb(220 38 38)",
    },
    fonts: {
      heading: "'Montserrat', system-ui, sans-serif",
      body: "'Open Sans', system-ui, sans-serif",
      mono: "'Fira Code', 'Consolas', monospace",
    },
    spacing: {
      radius: "8px",
      radiusSm: "4px",
      radiusLg: "12px",
    },
    assets: {
      logoUrl: "/images/logos/ae-logo-white.png",
      logoUrlDark: "/images/logos/ae-logo-white.png",
    },
  },

  // Default/Demo Brand (Blue)
  "default": {
    id: "default",
    name: "SMS Demo",
    colors: {
      brand: {
        50: "rgb(239 246 255)",
        100: "rgb(219 234 254)",
        200: "rgb(191 219 254)",
        300: "rgb(147 197 253)",
        400: "rgb(96 165 250)",
        500: "rgb(59 130 246)",
        600: "rgb(37 99 235)",
        700: "rgb(29 78 216)",
        800: "rgb(30 64 175)",
        900: "rgb(30 58 138)",
        950: "rgb(23 37 84)",
      },
      primary: "rgb(37 99 235)",
      primaryHover: "rgb(29 78 216)",
      primaryForeground: "rgb(255 255 255)",
      secondary: "rgb(100 116 139)",
      secondaryHover: "rgb(71 85 105)",
      secondaryForeground: "rgb(255 255 255)",
      accent: "rgb(6 182 212)",
      accentForeground: "rgb(255 255 255)",
      background: "rgb(249 250 251)",
      backgroundAlt: "rgb(255 255 255)",
      card: "rgb(255 255 255)",
      cardForeground: "rgb(15 23 42)",
      header: "rgb(255 255 255)",
      headerForeground: "rgb(15 23 42)",
      footer: "rgb(30 41 59)",
      footerForeground: "rgb(255 255 255)",
      foreground: "rgb(15 23 42)",
      mutedForeground: "rgb(100 116 139)",
      border: "rgb(226 232 240)",
      input: "rgb(226 232 240)",
      ring: "rgb(37 99 235)",
      success: "rgb(34 197 94)",
      successHover: "rgb(22 163 74)",
      warning: "rgb(245 158 11)",
      error: "rgb(239 68 68)",
      errorHover: "rgb(220 38 38)",
    },
    fonts: {
      heading: "system-ui, sans-serif",
      body: "system-ui, sans-serif",
      mono: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
    },
    spacing: {
      radius: "8px",
      radiusSm: "4px",
      radiusLg: "12px",
    },
  },
};

// ============================================
// DEFAULT BRAND
// ============================================

export const defaultBrand: BrandTheme = brands["default"];

/**
 * Get a brand by ID with fallback to default
 */
export function getBrand(brandId: string | undefined): BrandTheme {
  if (!brandId) return defaultBrand;
  return brands[brandId] ?? defaultBrand;
}

/**
 * Get list of all available brands
 */
export function getAllBrandIds(): string[] {
  return Object.keys(brands);
}

/**
 * Get brands as options for Builder.io select input
 */
export function getBrandOptions(): Array<{ label: string; value: string }> {
  return Object.values(brands).map((brand) => ({
    label: brand.name,
    value: brand.id,
  }));
}
