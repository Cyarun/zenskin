import type { Config } from 'tailwindcss'

/**
 * SKÖN24 Design System - Tailwind Configuration
 *
 * Premium Scandinavian Skincare Aesthetic
 * Brand: SKÖN24 | Tagline: välmående (well-being)
 *
 * Color Philosophy: Warm Beige/Cream with Amber Gold accents
 * Typography: Clean geometric sans-serif
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
        '2xl': '1440px',
      },
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4k': '2560px',
    },
    extend: {
      // ============================================
      // SKÖN24 Color System
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
        // SKÖN24 Brand Colors (Direct access)
        // ============================================

        // Primary - Amber/Gold (from product packaging)
        'amber': {
          DEFAULT: '#C5963A',
          50: '#FCF7EF',
          100: '#F7ECDA',
          200: '#EFD5B0',
          300: '#E4BA7D',
          400: '#D9A456',
          500: '#C5963A',  // Main brand amber
          600: '#A67A2E',
          700: '#875F24',
          800: '#6D4C1E',
          900: '#5A3F1A',
          950: '#332210',
        },

        // Background - Warm Beige/Cream (from product image background)
        'beige': {
          DEFAULT: '#E8E2DA',
          50: '#FDFCFB',
          100: '#F7F5F2',
          200: '#F0EBE5',
          300: '#E8E2DA',  // Main background
          400: '#D8CFC3',
          500: '#C4B8A8',
          600: '#A89A87',
          700: '#8C7D6A',
          800: '#706454',
          900: '#5A5044',
          950: '#2F2A23',
        },

        // Product White - Frosted white (packaging color)
        'frost': {
          DEFAULT: '#F5F3F0',
          50: '#FFFFFF',
          100: '#FDFCFB',
          200: '#F9F7F5',
          300: '#F5F3F0',  // Main frost white
          400: '#E8E4DE',
          500: '#D4CEC5',
          600: '#B8B0A4',
          700: '#9A9186',
          800: '#7D756B',
          900: '#655E56',
        },

        // Text Colors
        'charcoal': '#2D2D2D',
        'slate': '#4A4A4A',
        'gray': {
          DEFAULT: '#8A8A8A',
          light: '#B0B0B0',
          dark: '#5A5A5A',
        },

        // Semantic
        'success': '#7BA05B',
        'error': '#C54B4B',
        'warning': '#C5963A',
        'info': '#5B8BA0',
      },

      // ============================================
      // Typography
      // ============================================
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        logo: ['Bebas Neue', 'Impact', 'sans-serif'],
      },
      fontSize: {
        // SKÖN24 Typography Scale
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.25', fontWeight: '600' }],
        'subheading': ['1.5rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        'nav': ['0.875rem', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.05em' }],
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'tight': '-0.01em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },

      // ============================================
      // Spacing
      // ============================================
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
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
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 10px 20px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'amber': '0 4px 14px 0 rgba(197, 150, 58, 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)',
      },

      // ============================================
      // Animations
      // ============================================
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
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
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
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
      // Background Images
      // ============================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-beige': 'linear-gradient(180deg, #F7F5F2 0%, #E8E2DA 100%)',
        'gradient-frost': 'linear-gradient(180deg, #FFFFFF 0%, #F5F3F0 100%)',
        'gradient-amber': 'linear-gradient(135deg, #D9A456 0%, #C5963A 50%, #A67A2E 100%)',
      },

      // ============================================
      // Aspect Ratios
      // ============================================
      aspectRatio: {
        'product': '3 / 4',
        'hero': '16 / 9',
        'square': '1 / 1',
        'wide': '21 / 9',
        'portrait': '2 / 3',
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
