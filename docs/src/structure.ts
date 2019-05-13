export const structure = [
  {
    type: 'section',
    name: 'Getting Started',
    children: [
      {
        type: 'page',
        name: 'What is Kitten?',
        children: [
          {
            type: 'block',
            block: 'markdown',
            source: 'index.md',
          },
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Components',
    children: [
      {
        type: 'page',
        name: 'Components Overview',
        children: [
          {
            type: 'block',
            block: 'components-overview',
          },
        ],
      },
      {
        type: 'group',
        name: 'Global',
      },
      {
        type: 'tabs',
        name: 'Layout',
        icon: 'layout.svg',
        source: [
          'Layout',
        ],
      },
      {
        type: 'tabs',
        name: 'List',
        icon: 'list.svg',
        source: [
          'List',
          'ListItem',
        ],
      },
      {
        type: 'group',
        name: 'Navigation',
      },
      {
        type: 'tabs',
        name: 'Top Navigation',
        icon: 'actions.svg',
        source: [
          'TopNavigation',
        ],
      },
      {
        type: 'tabs',
        name: 'Bottom Navigation',
        icon: 'tab.svg',
        source: [
          'BottomNavigation',
          'BottomNavigationTab',
        ],
      },
      {
        type: 'tabs',
        name: 'ViewPager',
        icon: 'button.svg',
        source: [
          'ViewPager',
        ],
      },
      {
        type: 'tabs',
        name: 'Tab Set',
        icon: 'tab.svg',
        source: [
          'TabView',
          'TabBar',
          'Tab',
        ],
      },
      {
        type: 'group',
        name: 'Forms',
      },
      {
        type: 'tabs',
        name: 'CheckBox',
        icon: 'checkbox.svg',
        source: [
          'CheckBox',
        ],
      },
      {
        type: 'tabs',
        name: 'Radio',
        icon: 'radio.svg',
        source: [
          'Radio',
        ],
      },
      {
        type: 'tabs',
        name: 'RadioGroup',
        icon: 'radio.svg',
        source: [
          'RadioGroup',
        ],
      },
      {
        type: 'tabs',
        name: 'Toggle',
        icon: 'checkbox.svg',
        source: [
          'Toggle',
        ],
      },
      {
        type: 'tabs',
        name: 'Input',
        icon: 'input.svg',
        source: [
          'Input',
        ],
      },
      {
        type: 'tabs',
        name: 'Button',
        icon: 'button.svg',
        source: [
          'Button',
        ],
      },
      {
        type: 'tabs',
        name: 'Button Group',
        icon: 'button.svg',
        source: [
          'ButtonGroup',
        ],
      },
      {
        type: 'group',
        name: 'Modals & Overlays',
      },
      {
        type: 'tabs',
        name: 'Overflow Menu',
        icon: 'menu.svg',
        source: [
          'OverflowMenu',
          'OverflowMenuItem',
        ],
      },
      {
        type: 'tabs',
        name: 'Modal',
        icon: 'dialog.svg',
        source: [
          'Modal',
        ],
      },
      {
        type: 'tabs',
        name: 'Popover',
        icon: 'popover.svg',
        source: [
          'Popover',
        ],
      },
      {
        type: 'tabs',
        name: 'Tooltip',
        icon: 'tooltip.svg',
        source: [
          'Tooltip',
        ],
      },
      {
        type: 'group',
        name: 'Extra',
      },
      {
        type: 'tabs',
        name: 'User (Avatar)',
        icon: 'user.svg',
        source: [
          'Avatar',
        ],
      },
      {
        type: 'tabs',
        name: 'Text',
        icon: 'input.svg',
        source: [
          'Text',
        ],
      },
    ],
  },
  {
    type: 'section',
    name: 'Services',
    children: [
      {
        type: 'page',
        name: 'ModalService',
        children: [
          {
            type: 'block',
            block: 'component',
            source: 'ModalServiceType',
          },
        ],
      },
    ],
  },
];
