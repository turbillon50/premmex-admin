import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        charcoal: '#141414',
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        ivory: '#F5F0E8',
        mist: '#9A9A9A',
      },
      fontFamily: { serif: ['Georgia','serif'], sans: ['Inter','sans-serif'] },
    }
  },
  plugins: [],
}
export default config
