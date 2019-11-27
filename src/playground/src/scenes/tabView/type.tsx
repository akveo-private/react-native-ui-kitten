import React from 'react';
import {
  Tab,
  Text,
  Layout,
  Icon,
} from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';
import { StarIcon } from '@pg/icons';

const titleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab title='Tab 1'>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
      </Tab>,
      <Tab title='Tab 2'>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </Tab>,
      <Tab title='Tab 3'>
        <Layout>
          <Text>Tab 3</Text>
        </Layout>
      </Tab>,
    ],
  },
};

const iconBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab icon={StarIcon}>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
      </Tab>,
      <Tab icon={StarIcon}>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </Tab>,
      <Tab icon={StarIcon}>
        <Layout>
          <Text>Tab 3</Text>
        </Layout>
      </Tab>,
    ],
  },
};

const iconTitleBottomNavigation: ComponentShowcaseItem = {
  props: {
    children: [
      <Tab icon={StarIcon} title='Tab 1'>
        <Layout>
          <Text>Tab 1</Text>
        </Layout>
      </Tab>,
      <Tab icon={StarIcon} title='Tab 2'>
        <Layout>
          <Text>Tab 2</Text>
        </Layout>
      </Tab>,
      <Tab icon={StarIcon} title='Tab 3'>
        <Layout>
          <Text>Tab 3</Text>
        </Layout>
      </Tab>,
    ],
  },
};

const titleSection: ComponentShowcaseSection = {
  title: 'Title',
  items: [
    titleBottomNavigation,
  ],
};

const iconSection: ComponentShowcaseSection = {
  title: 'Icon',
  items: [
    iconBottomNavigation,
  ],
};

const iconTitleSection: ComponentShowcaseSection = {
  title: 'Icon Title',
  items: [
    iconTitleBottomNavigation,
  ],
};

export const tabViewShowcase: ComponentShowcase = {
  title: 'Tab View',
  sections: [
    titleSection,
    iconSection,
    iconTitleSection,
  ],
};
