import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';


export const mapping: ThemeMappingType = {
  'Tab': {
    'meta': {
      'scope': 'all',
      'mapping': {},
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {},
      'states': {
        'selected': {
          'default': false,
          'priority': 0,
          'scope': 'all',
        },
      },
    },
    'appearance': {
      'default': {
        'mapping': {
          'text': {
            'color': 'gray-dark',
            'fontWeight': '600',
          },
          'state': {
            'selected': {
              'text': {
                'color': 'blue-primary',
              },
            },
          },
        },
      },
    },
  },
  'TabBar': {
    'meta': {
      'scope': 'all',
      'mapping': {
        'barSize': {
          'type': 'number',
        },
        'indicatorSize': {
          'type': 'number',
        },
        'indicatorBorderRadius': {
          'type': 'number',
        },
        'indicatorColor': {
          'type': 'color',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
      },
      'variants': {},
      'states': {},
    },
    'appearance': {
      'default': {
        'mapping': {
          'barSize': 42,
          'indicatorSize': 4,
          'indicatorBorderRadius': 2,
          'indicatorColor': 'blue-primary',
        },
      },
    },
  },
};

export const theme: ThemeType = {
  'blue-primary': '#3366FF',
  'blue-dark': '#2541CC',
  'gray-light': '#DDE1EB',
  'gray-primary': '#A6AEBD',
  'gray-dark': '#8992A3',
  'gray-highlight': '#EDF0F5',
  'pink-primary': '#FF3D71',
};
