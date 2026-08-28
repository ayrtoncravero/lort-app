import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'

// LORT theme — Middle-earth, sotto voce. Gold is accent-only, never dominant.
const lortDark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#0d0f0d',
    surface: '#141714',
    'surface-bright': '#1b1f1b',
    'surface-light': '#1f231f',
    'surface-variant': '#2a2e29',
    'on-surface-variant': '#a8ac9f',
    primary: '#c9a961',
    'primary-darken-1': '#a6893f',
    secondary: '#2f4a3a',
    'secondary-darken-1': '#233a2c',
    error: '#b5544a',
    info: '#5c7f8a',
    success: '#5c8a63',
    warning: '#c9a961',
    outline: '#3a3f38'
  },
  variables: {
    'border-color': '#3a3f38',
    'high-emphasis-opacity': 0.95,
    'medium-emphasis-opacity': 0.68
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'lortDark',
    themes: { lortDark }
  },
  defaults: {
    VBtn: {
      variant: 'flat',
      class: 'text-none font-weight-medium'
    },
    VCard: {
      elevation: 0,
      border: true,
      rounded: 'lg'
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable'
    },
    VChip: {
      variant: 'outlined'
    }
  }
})
