import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetWind,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetWind()],
  transformers: [transformerDirectives()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['flex-row', 'flex flex-row'],
    ['flex-between', 'flex flex-row items-center justify-between'],
    ['flex-col-center', 'flex flex-col justify-center items-center'],
    ['flex-2', 'flex items-center gap-2 '],
    ['text-ellipsis', 'truncate'],
    ['text-standard', 'text-sm md:text-base'],
    ['text-standard-small', 'text-xs md:text-sm'],
    ['text-standard-big', 'text-base md:text-5'],
  ],
  rules: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
    colors: {
      text: '#ebeaf8',
      background: '#09081a',
      primary: '#a3f468',
      secondary: '#7f6329',
      accent: '#83c448',
    },
  },
});

