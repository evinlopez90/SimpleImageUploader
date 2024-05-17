/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryLight: '#F9FAFB',
        secondaryLight: '#FFF',
        primaryDark: '#121826',
        secondaryDark: '#212936',
        textLight: '#121826',
        textDark: '#C2DAF9',
        buttonDark: '#364153', 
        borderColor: '#E5E7EB',
        progress: '#3662E3',
        bgProgressDark: '#4D5562'
      }
    }
  },
  plugins: []
}