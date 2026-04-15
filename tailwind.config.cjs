/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        blinkit: {
          bg: '#F3F4F6',
          card: '#FFFFFF',
          text: '#1C1C1C',
          brand: '#F7EC09',
          success: '#0C831F'
        }
      },
      borderRadius: {
        xl2: '12px'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.06), 0 6px 16px rgba(0,0,0,0.06)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

