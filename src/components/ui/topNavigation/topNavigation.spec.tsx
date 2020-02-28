/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  TopNavigation,
  TopNavigationProps,
} from './TopNavigation.component';
import {
  TopNavigationAction,
  TopNavigationActionProps,
} from './topNavigationAction.component';

describe('@top-navigation-action: component checks', () => {

  const TestTopNavigationAction = (props?: TopNavigationActionProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <TopNavigationAction {...props}/>
    </ApplicationProvider>
  );

  it('should render image passed to icon prop', () => {
    const Icon = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const component = render(
      <TestTopNavigationAction icon={Icon}/>,
    );

    const image = component.getByType(Image);

    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' });
  });

  it('should call onPress', () => {
    const onPress = jest.fn();

    const component = render(
      <TestTopNavigationAction onPress={onPress}/>,
    );

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onPress).toBeCalled();
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestTopNavigationAction onPressIn={onPressIn}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    expect(onPressIn).toBeCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestTopNavigationAction onPressOut={onPressOut}/>,
    );

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    expect(onPressOut).toBeCalled();
  });

});

describe('@top-navigation: component checks', () => {

  const TestTopNavigation = (props?: Partial<TopNavigationProps>) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <TopNavigation {...props}/>
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestTopNavigation title='I love Babel'/>,
    );

    expect(component.getByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestTopNavigation title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.getByText('I love Babel')).toBeTruthy();
  });

  it('should render text passed to subtitle prop', () => {
    const component = render(
      <TestTopNavigation subtitle='I love Babel'/>,
    );

    expect(component.getByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to subtitle prop', () => {
    const component = render(
      <TestTopNavigation subtitle={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.getByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to accessoryLeft prop', () => {
    const component = render(
      <TestTopNavigation subtitle={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.getByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to accessoryRight prop', () => {
    const component = render(
      <TestTopNavigation subtitle={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.getByText('I love Babel')).toBeTruthy();
  });
});
