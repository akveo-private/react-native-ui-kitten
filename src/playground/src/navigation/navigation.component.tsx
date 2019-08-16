import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import {
  Home,
  ButtonContainer,
  ButtonGroupContainer,
  AvatarContainer,
  InputContainer,
  CheckBoxContainer,
  ToggleContainer,
  RadioContainer,
  TextContainer,
  ListContainer,
  PopoverContainer,
  TooltipContainer,
  OverflowMenuContainer,
  BottomNavigationContainer,
  TabViewContainer,
  TopNavigationContainer,
  RadioGroupContainer,
  LayoutContainer,
  SampleContainer,
  ModalContainer,
  MenuContainer,
} from '../ui/screen';

export interface RouteType {
  name: string;
}

const AppNavigator = createStackNavigator({
  ['Home']: Home,
  ['Avatar']: AvatarContainer,
  ['Bottom Navigation']: BottomNavigationContainer,
  ['Button']: ButtonContainer,
  ['Button Group']: ButtonGroupContainer,
  ['Checkbox']: CheckBoxContainer,
  ['Input']: InputContainer,
  ['Layout']: LayoutContainer,
  ['List']: ListContainer,
  ['Menu']: MenuContainer,
  ['Modal']: ModalContainer,
  ['Popover']: PopoverContainer,
  ['Radio']: RadioContainer,
  ['Radio Group']: RadioGroupContainer,
  ['Tab View']: TabViewContainer,
  ['Tooltip']: TooltipContainer,
  ['Text']: TextContainer,
  ['Toggle']: ToggleContainer,
  ['Top Navigation']: TopNavigationContainer,
  ['Overflow Menu']: OverflowMenuContainer,
  ['Sample']: SampleContainer,
}, {
  initialRouteName: 'Menu',
  headerMode: 'screen',
});

export const Router: any = createAppContainer(AppNavigator);
