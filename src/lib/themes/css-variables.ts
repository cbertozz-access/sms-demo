/**
 * CSS Variables Generator
 *
 * Converts brand theme objects into CSS custom properties.
 * These are injected at runtime based on the active brand.
 */

import type { BrandTheme } from "./types";

/**
 * Generate CSS variables as a style object (for inline styles)
 */
export function generateCssVariablesObject(
  theme: BrandTheme
): Record<string, string> {
  const vars: Record<string, string> = {
    // Brand color scale
    "--color-brand-50": theme.colors.brand[50],
    "--color-brand-100": theme.colors.brand[100],
    "--color-brand-200": theme.colors.brand[200],
    "--color-brand-300": theme.colors.brand[300],
    "--color-brand-400": theme.colors.brand[400],
    "--color-brand-500": theme.colors.brand[500],
    "--color-brand-600": theme.colors.brand[600],
    "--color-brand-700": theme.colors.brand[700],
    "--color-brand-800": theme.colors.brand[800],
    "--color-brand-900": theme.colors.brand[900],
    "--color-brand-950": theme.colors.brand[950],

    // Semantic colors with hover states
    "--color-primary": theme.colors.primary,
    "--color-primary-hover": theme.colors.primaryHover,
    "--color-primary-foreground": theme.colors.primaryForeground,

    "--color-secondary": theme.colors.secondary,
    "--color-secondary-hover": theme.colors.secondaryHover,
    "--color-secondary-foreground": theme.colors.secondaryForeground,

    "--color-accent": theme.colors.accent,
    "--color-accent-foreground": theme.colors.accentForeground,

    // Backgrounds
    "--color-background": theme.colors.background,
    "--color-background-alt": theme.colors.backgroundAlt,
    "--color-card": theme.colors.card,
    "--color-card-foreground": theme.colors.cardForeground,

    // Header/Footer
    "--color-header": theme.colors.header || theme.colors.background,
    "--color-header-foreground": theme.colors.headerForeground || theme.colors.foreground,
    "--color-footer": theme.colors.footer || theme.colors.primary,
    "--color-footer-foreground": theme.colors.footerForeground || "rgb(255 255 255)",

    // Text
    "--color-foreground": theme.colors.foreground,
    "--color-muted-foreground": theme.colors.mutedForeground,

    // Borders
    "--color-border": theme.colors.border,
    "--color-input": theme.colors.input,
    "--color-ring": theme.colors.ring,

    // Semantic status
    "--color-success": theme.colors.success,
    "--color-success-hover": theme.colors.successHover,
    "--color-warning": theme.colors.warning,
    "--color-error": theme.colors.error,
    "--color-error-hover": theme.colors.errorHover,

    // Typography
    "--font-heading": theme.fonts.heading,
    "--font-body": theme.fonts.body,

    // Spacing
    "--radius": theme.spacing.radius,
    "--radius-sm": theme.spacing.radiusSm,
    "--radius-lg": theme.spacing.radiusLg,
  };

  // Add mono font if present
  if (theme.fonts.mono) {
    vars["--font-mono"] = theme.fonts.mono;
  }

  // Add asset URLs if present
  if (theme.assets?.logoUrl) {
    vars["--logo-url"] = `url(${theme.assets.logoUrl})`;
  }
  if (theme.assets?.logoUrlDark) {
    vars["--logo-url-dark"] = `url(${theme.assets.logoUrlDark})`;
  }

  return vars;
}

/**
 * Tailwind class mappings for common patterns
 * Use these in components instead of hardcoded colors
 */
export const themeClasses = {
  // Buttons - Primary
  buttonPrimary:
    "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-primary-foreground)]",

  // Buttons - Secondary
  buttonSecondary:
    "bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-[var(--color-secondary-foreground)]",

  // Buttons - Outline
  buttonOutline:
    "border border-[var(--color-border)] hover:bg-[var(--color-background-alt)] text-[var(--color-foreground)]",

  // Buttons - Ghost
  buttonGhost:
    "hover:bg-[var(--color-background-alt)] text-[var(--color-foreground)]",

  // Buttons - Destructive
  buttonDestructive:
    "bg-[var(--color-error)] hover:bg-[var(--color-error-hover)] text-white",

  // Buttons - Success
  buttonSuccess:
    "bg-[var(--color-success)] hover:bg-[var(--color-success-hover)] text-white",

  // Inputs
  input:
    "border border-[var(--color-input)] bg-[var(--color-background)] text-[var(--color-foreground)] rounded-[var(--radius-sm)] focus:ring-2 focus:ring-[var(--color-ring)] focus:border-[var(--color-ring)]",

  // Cards
  card: "bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] rounded-[var(--radius)]",

  // Text
  heading: "text-[var(--color-foreground)] font-[var(--font-heading)]",
  body: "text-[var(--color-foreground)] font-[var(--font-body)]",
  muted: "text-[var(--color-muted-foreground)]",

  // Backgrounds
  bgPrimary: "bg-[var(--color-primary)]",
  bgSecondary: "bg-[var(--color-secondary)]",
  bgAlt: "bg-[var(--color-background-alt)]",
  bgCard: "bg-[var(--color-card)]",

  // Text colors
  textPrimary: "text-[var(--color-primary)]",
  textSecondary: "text-[var(--color-secondary)]",
  textSuccess: "text-[var(--color-success)]",
  textWarning: "text-[var(--color-warning)]",
  textError: "text-[var(--color-error)]",

  // Borders
  borderPrimary: "border-[var(--color-primary)]",
  borderDefault: "border-[var(--color-border)]",

  // Focus ring
  focusRing: "focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-2",
} as const;
