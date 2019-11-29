import React from 'react';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
  ComponentShowcaseSetting,
} from '@pg/model/componentShowcase.model';
import {
  Body,
  CustomHeader,
  Footer,
  Header,
} from './cardExamples';

const defaultCard: ComponentShowcaseItem = {
  props: {
    children: <Body/>,
  },
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default',
  items: [
    defaultCard,
  ],
};

const evaHeaderCard: ComponentShowcaseItem = {
  props: {
    children: <Body/>,
    header: Header,
  },
};

const evaHeaderSection: ComponentShowcaseSection = {
  title: 'Eva Header',
  items: [
    evaHeaderCard,
  ],
};

const customHeaderCard: ComponentShowcaseItem = {
  props: {
    children: <Body/>,
    header: CustomHeader,
  },
};

const customHeaderSection: ComponentShowcaseSection = {
  title: 'Custom Header',
  items: [
    customHeaderCard,
  ],
};

const footerCard: ComponentShowcaseItem = {
  props: {
    children: <Body/>,
    footer: Footer,
  },
};

const footerSection: ComponentShowcaseSection = {
  title: 'Footer',
  items: [
    footerCard,
  ],
};

const headerFooterCard: ComponentShowcaseItem = {
  props: {
    children: <Body/>,
    header: Header,
    footer: Footer,
  },
};

const headerFooterSection: ComponentShowcaseSection = {
  title: 'Header + Footer',
  items: [
    headerFooterCard,
  ],
};

export const cardShowcase: ComponentShowcase = {
  title: 'Card',
  sections: [
    defaultSection,
    evaHeaderSection,
    customHeaderSection,
    footerSection,
    headerFooterSection,
  ],
};

export const cardSettings: ComponentShowcaseSetting[] = [
  {
    propertyName: 'appearance',
    value: 'outline',
  },
  {
    propertyName: 'appearance',
    value: 'filled',
  },
  {
    propertyName: 'status',
    value: 'basic',
  },
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
    value: 'control',
  },
];
