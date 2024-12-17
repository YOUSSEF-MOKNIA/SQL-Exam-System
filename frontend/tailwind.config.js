module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Add paths to your files
  ],
  theme: {
    extend: {
      colors: {
        customBlue: {
          50: '#EBF8FF',
          100: '#BEE3F8',
          200: '#90CDF4',
          300: '#63B3ED',
          400: '#4299E1',
          500: '#3182CE', // Base color (500)
          600: '#2B6CB0',
          700: '#2C5282',
          800: '#2A4365',
          900: '#1A365D',
        },
        customGreen: {
          50: '#F0FFF4',
          100: '#C6F6D5',
          200: '#9AE6B4',
          300: '#68D391',
          400: '#48BB78',
          500: '#38A169', // Base color (500)
          600: '#2F855A',
          700: '#276749',
          800: '#22543D',
          900: '#1C4532',
        },
      },
    },
  },
  plugins: [],
}
