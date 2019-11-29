import React from 'react';
import {
  Icon,
  IconElement,
  SelectOptionType,
  StyleType,
} from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
} from '@pg/icons';

const defaultSelectOption: SelectOptionType[] = [
  {
    text: 'Option 1',
    disabled: true,
  },
  { text: 'Option 2' },
  { text: 'Option 3' },
  { text: 'Option 4' },
  { text: 'Option 5' },
  { text: 'Option 6' },
  { text: 'Option 7' },
  { text: 'Option 8' },
];

const withGroupsSelectOption: SelectOptionType[] = [
  { text: 'Option 1' },
  {
    text: 'Option 2',
    items: [
      {
        text: 'Option 21',
        disabled: true,
      },
      { text: 'Option 22' },
      { text: 'Option 23' },
    ],
  },
  // { text: 'Option 3' },
  // { text: 'Option 4' },
  // { text: 'Option 5' },
];

const renderIcon = (style: StyleType, visible: boolean): IconElement => {
  const Arrow: React.FC = visible ? ArrowUpwardIcon : ArrowDownwardIcon;
  return (
    <Arrow {...style} />
  );
};

const defaultSelect: ComponentShowcaseItem = {
  title: 'Default',
  props: {
    data: defaultSelectOption,
  },
};

const disabledSelect: ComponentShowcaseItem = {
  title: 'Disabled',
  props: {
    data: defaultSelectOption,
    disabled: true,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default Select',
  items: [
    defaultSelect,
    disabledSelect,
  ],
};

const multiSelectSelect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    multiSelect: true,
    data: defaultSelectOption,
  },
};

const multiSelectSection: ComponentShowcaseSection = {
  title: 'Multiselect Select',
  items: [
    multiSelectSelect,
  ],
};

const groupSelect: ComponentShowcaseItem = {
  title: 'With Groups',
  props: {
    data: withGroupsSelectOption,
  },
};

const groupSelectMultiselect: ComponentShowcaseItem = {
  title: 'Multiselect',
  props: {
    multiSelect: true,
    data: withGroupsSelectOption,
  },
};

const withGroupsSection: ComponentShowcaseSection = {
  title: 'Groups Select',
  items: [
    groupSelect,
    // groupSelectMultiselect,
  ],
};

const withIconSelect: ComponentShowcaseItem = {
  title: 'With icon',
  props: {
    data: defaultSelectOption,
    icon: renderIcon,
    multiSelect: true,
  },
};

const withIconSection: ComponentShowcaseSection = {
  title: 'With icon',
  items: [
    withIconSelect,
  ],
};

const withLabelSelect: ComponentShowcaseItem = {
  title: 'Label',
  props: {
    data: defaultSelectOption,
    label: 'Label',
  },
};

const withCustomPlaceholderSelect: ComponentShowcaseItem = {
  title: 'Placeholder',
  props: {
    data: defaultSelectOption,
    placeholder: 'Place your Text',
  },
};

const customTextsSection: ComponentShowcaseSection = {
  title: 'Texts',
  items: [
    withLabelSelect,
    withCustomPlaceholderSelect,
  ],
};

const preselectedReference: ComponentShowcaseItem = {
  title: 'Ref',
  props: {
    data: defaultSelectOption,
    preselectedItem: defaultSelectOption[1],
  },
};

const preselectedReferenceMultiSelect: ComponentShowcaseItem = {
  title: 'Multi Ref',
  props: {
    multiSelect: true,
    data: defaultSelectOption,
    preselectedItem: [defaultSelectOption[1]],
  },
};

const preselectedReferenceSection: ComponentShowcaseSection = {
  title: 'Preselected Reference',
  items: [
    preselectedReference,
    preselectedReferenceMultiSelect,
  ],
};

const preselectedInline: ComponentShowcaseItem = {
  title: 'Inline',
  props: {
    data: defaultSelectOption,
    preselectedItem: { text: 'Option 3' },
    keyExtractor: (item: SelectOptionType) => item.text,
  },
};

const preselectedInlineMultiSelect: ComponentShowcaseItem = {
  title: 'Multi Inline',
  props: {
    multiSelect: true,
    data: defaultSelectOption,
    preselectedItem: [{ text: 'Option 3' }],
    keyExtractor: (item: SelectOptionType) => item.text,
  },
};

const preselectedInlineSection: ComponentShowcaseSection = {
  title: 'Preselected Inline',
  items: [
    preselectedInline,
    preselectedInlineMultiSelect,
  ],
};

export const selectShowcase: ComponentShowcase = {
  title: 'Select',
  sections: [
    defaultSection,
    multiSelectSection,
    withGroupsSection,
    withIconSection,
    customTextsSection,
    preselectedReferenceSection,
    preselectedInlineSection,
  ],
};

export const selectSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'status',
    value: 'primary',
  },
  {
    propertyName: 'status',
    value: 'success',
  },
  {
    propertyName: 'status',
    value: 'info',
  },
  {
    propertyName: 'status',
    value: 'warning',
  },
  {
    propertyName: 'status',
    value: 'danger',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
  {
    propertyName: 'status',
    value: 'control',
  },
  {
    propertyName: 'size',
    value: 'small',
  },
  {
    propertyName: 'size',
    value: 'medium',
  },
  {
    propertyName: 'size',
    value: 'large',
  },
];
