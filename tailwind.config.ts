import type { Config } from 'tailwindcss'

/**
 * ZenSkin.in Design System - Tailwind Configuration
 *
 * Premium Korean Skincare Aesthetic
 * Based on ZenSkin.com design analysis
 *
 * Color Philosophy: White/Snow-White/Cream/Gray
 * Typography: Figtree (body) + Amiri (headlines)
 *
 * Supports responsive design across:
 * - Mobile phones (320px - 430px)
 * - Tablets (768px - 1024px)
 * - Laptops (1024px - 1440px)
 * - Large screens (1440px+)
 */

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Monorepo paths
    './apps/web/app/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/web/components/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/mobile/app/**/*.{js,ts,jsx,tsx}',
    './apps/mobile/components/**/*.{js,ts,jsx,tsx}',
    './packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px', // Max container width
      },
    },
    screens: {
      // Mobile-first breakpoints
      'xs': '375px',     // iPhone SE, small Android
      'sm': '640px',     // Large phones
      'md': '768px',     // Tablets (portrait)
      'lg': '1024px',    // Tablets (landscape), small laptops
      'xl': '1280px',    // Desktops
      '2xl': '1536px',   // Large desktops
      '3xl': '1920px',   // Full HD monitors
      '4k': '2560px',    // 4K monitors
    },
    extend: {
      // ============================================
      // ZenSkin Color System
      // ============================================
      colors: {
        // CSS Variable-based colors (for shadcn/ui)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // ============================================
        // ZenSkin Brand Colors (Direct access)
        // ============================================

        // Primary Backgrounds
        'pure-white': '#FFFFFF',
        'snow': '#F7F9FA',
        'cream': '#FFFCF7',
        'light-gray': '#F0F0F0',
        'soft-gray': '#E8E8E8',

        // Text Colors
        'rich-black': '#212121',
        'pure-black': '#000000',
        'medium-gray': '#646464',
        'muted-gray': '#9A9A9A',

        // Accent Colors
        'gold': {
          DEFAULT: '#AB8C52',
          light: 'rgba(171, 140, 82, 0.05)',
          dark: '#8B7142',
        },
        'sage': {
          DEFAULT: '#B5CAAC',
          light: 'rgba(181, 202, 172, 0.2)',
          dark: '#95AA8C',
        },
        'soft-pink': '#F9DEE5',
        'warm-peach': '#FFF0DB',

        // Semantic
        'success': '#B5CAAC',
        'error': '#D20000',
        'warning': '#AB8C52',
      },

      // ============================================
      // Typography
      // ============================================
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
        serif: ['Amiri', 'Times New Roman', 'serif'],
        display: ['GT Standard', 'Figtree', 'sans-serif'],
      },
      fontSize: {
        // ZenSkin Typography Scale
        'hero': ['2.9rem', { lineHeight: '1.2', fontWeight: '400' }],
        'section': ['2rem', { lineHeight: '1.2', fontWeight: '400' }],
        'subheading': ['1.375rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['0.9375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'nav': ['0.8125rem', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      letterSpacing: {
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },

      // ============================================
      // Spacing (4px grid system)
      // ============================================
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        // Safe area insets for mobile
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      // ============================================
      // Border Radius
      // ============================================
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // ============================================
      // Shadows
      // ============================================
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
        'gold': '0 4px 14px 0 rgba(171, 140, 82, 0.25)',
      },

      // ============================================
      // Animations
      // ============================================
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      // ============================================
      // Transitions
      // ============================================
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ============================================
      // Aspect Ratios
      // ============================================
      aspectRatio: {
        'product': '1 / 1',        // Square product images
        'hero': '16 / 9',          // Hero banners
        'portrait': '3 / 4',       // Product lifestyle
        'wide': '21 / 9',          // Wide banners
      },

      // ============================================
      // Z-Index Scale
      // ============================================
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
