/**
 * Brand Theme Type Definitions
 *
 * Supports multiple brands with consistent token structure.
 * Tokens are aligned with Figma variables.
 */

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface BrandColors {
  // Full brand color scale
  brand: ColorScale;

  // Semantic colors with hover states
  primary: string;
  primaryHover: string;
  primaryForeground: string;

  secondary: string;
  secondaryHover: string;
  secondaryForeground: string;

  accent: string;
  accentForeground: string;

  // Backgrounds
  background: string;
  backgroundAlt: string;
  card: string;
  cardForeground: string;

  // Header/Footer specific
  header?: string;
  headerForeground?: string;
  footer?: string;
  footerForeground?: string;

  // Text
  foreground: string;
  mutedForeground: string;

  // Borders
  border: string;
  input: string;
  ring: string;

  // Semantic status
  success: string;
  successHover: string;
  warning: string;
  error: string;
  errorHover: string;
}

export interface BrandAssets {
  logoUrl?: string;
  logoUrlDark?: string;
  faviconUrl?: string;
}

export interface BrandFonts {
  heading: string;
  body: string;
  mono?: string;
}

export interface BrandSpacing {
  radius: string;
  radiusSm: string;
  radiusLg: string;
}

export interface BrandTheme {
  id: string;
  name: string;
  colors: BrandColors;
  fonts: BrandFonts;
  spacing: BrandSpacing;
  assets?: BrandAssets;
}

/**
 * Builder.io Brand Data Model shape
 */
export interface BuilderBrandModel {
  id: string;
  name: string;
  theme: BrandTheme;
  logoUrl?: string;
  faviconUrl?: string;
}
