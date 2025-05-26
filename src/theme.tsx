import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: 'Rubik, sans-serif',
    body: 'Rubik, sans-serif',
  },
  colors: {
    brand: {
      50: '#f7f6f2', // lightest beige
      100: '#edeadf',
      200: '#e3e0d1',
      300: '#cfcab3',
      400: '#bcb495', // beige
      500: '#2d4739', // dark green (main)
      600: '#22362a', // darker green
      700: '#1a271f', // almost black-green
      800: '#101613',
      900: '#080a09',
    },
    accent: {
      500: '#3a7d3a', // green accent
      600: '#2e6130',
    },
    text: {
      500: '#f7f6f2', // beige for text
    },
  },
  styles: {
    global: {
      'body': {
        bg: 'brand.500',
        color: 'text.500',
      },
    },
  },
})

export default theme 