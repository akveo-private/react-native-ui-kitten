import { ThemeMappingType } from 'eva/packages/types';
import { ThemeType } from '@kitten/theme';

export const mapping: ThemeMappingType = {
  'TopNavigationBar': {
    'meta': {
      'scope': 'mobile',
      'mapping': {
        'height': {
          'type': 'number',
        },
        'paddingTop': {
          'type': 'number',
        },
        'paddingBottom': {
          'type': 'number',
        },
        'paddingHorizontal': {
          'type': 'number',
        },
        'backgroundColor': {
          'type': 'color',
        },
      },
      'appearances': {
        'default': {
          'default': true,
        },
        'title-centered': {
          'default': false,
        },
      },
      'variants': {},
      'states': {},
    },
    'appearance': {
      'default': {
        'mapping': {
          'height': 46,
          'paddingTop': 4,
          'paddingBottom': 12,
          'paddingHorizontal': 16,
          'backgroundColor': 'blue-primary',
          'title.centered': false,
          'title.color': 'white',
          'title.fontSize': 16,
          'title.fontWeight': '600',
          'subtitle.color': 'white',
          'subtitle.fontSize': 12,
          'subtitle.fontWeight': '400',
        },
      },
      'title-centered': {
        'mapping': {
          'title.centered': true,
        },
      },
    },
  },
  'TopNavigationBarAction': {
    'meta': {
      'scope': 'mobile',
      'mapping': {
        'width': {
          'type': 'number',
        },
        'height': {
          'type': 'number',
        },
        'marginRight': {
          'type': 'number',
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
          'width': 25,
          'height': 25,
          'marginRight': 8,
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
