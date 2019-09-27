/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { BottomNavigationTabElement } from './bottomNavigationTab.component';
import {
  TabIndicator,
  TabIndicatorProps,
} from '../support/components';

type IndicatorElement = React.ReactElement<TabIndicatorProps>;
type ChildrenProp = BottomNavigationTabElement | BottomNavigationTabElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

export type BottomNavigationProps = StyledComponentProps & ViewProps & ComponentProps;
export type BottomNavigationElement = React.ReactElement<BottomNavigationProps>;

/**
 * `BottomNavigation` component is designed to be a Bottom Tab Bar.
 * Can be used for navigation.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines index of the selected tab.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default` | `noIndicator`.
 *
 * @property {React.ReactElement<TabProps> | React.ReactElement<TabProps>[]} children -
 * Determines tabs of the Bottom Navigation.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines styles of the indicator.
 *
 * @property {(index: number) => void} onSelect - Triggered on select value.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
 *
 * export class BottomNavigationShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: 0,
 *   };
 *
 *   onTabSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <BottomNavigation
 *         selectedIndex={this.state.selectedIndex}
 *         onSelect={this.onTabSelect}>
 *          <BottomNavigationTab title='Dashboard' />
 *          <BottomNavigationTab title='Settings' />
 *       </BottomNavigation>
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example With React Navigation
 *
 * ```
 * import React from 'react';
 * import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
 * import { createBottomTabNavigator } from 'react-navigation-tabs';
 * import { Dashboard, Settings } from './path-to/screen-components'; // <-- Import screen components
 *
 * export const BottomNavigationShowcase = (props) => {
 *
 *  const onTabSelect = (selectedIndex) => {
 *    const { [index]: selectedRoute } = props.navigation.state.routes;
 *    props.navigation.navigate(selectedRoute.routeName);
 *  };
 *
 *  return (
 *    <BottomNavigation
 *      selectedIndex={props.navigation.state.index}
 *      onSelect={onTabSelect}>
 *      <BottomNavigationTab title='Dashboard' />
 *      <BottomNavigationTab title='Settings' />
 *    </BottomNavigation>
 *   );
 * }
 *
 * export const BottomTabNavigator = createBottomTabNavigator({
 *   Dashboard: Dashboard,
 *   Settings: Settings,
 * }, {
 *   initialRouteName: 'Dashboard',
 *   tabBarComponent: BottomNavigationShowcase,
 * });
 * ```
 *
 * @example Without Indicator
 *
 * ```
 * import React from 'react';
 * import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
 *
 * export class BottomNavigationShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: 0,
 *   };
 *
 *   onTabSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render()  {
 *     return (
 *       <BottomNavigation
 *          appearance='noIndicator'
 *          selectedIndex={this.state.selectedIndex}
 *          onSelect={this.onTabSelect}>
 *          <BottomNavigationTab title='Dashboard' />
 *          <BottomNavigationTab title='Settings' />
 *       </BottomNavigation>
 *     );
 *   }
 * }
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
 *
 * export const BottomNavigationShowcase = (props) => (
 *   <BottomNavigation
 *      style={styles.bottomNavigation}
 *      indicatorStyle={styles.indicator}>
 *      <BottomNavigationTab title='Dashboard' />
 *      <BottomNavigationTab title='Settings' />
 *   </BottomNavigation>
 * );
 *
 * const styles = StyleSheet.create({
 *   bottomNavigation: { backgroundColor: 'white' },
 *   indicator: { backgroundColor: 'black' },
 * });
 * ```
 */
export class BottomNavigationComponent extends React.Component<BottomNavigationProps> {

  static styledComponentName: string = 'BottomNavigation';

  static defaultProps: Partial<BottomNavigationProps> = {
    selectedIndex: 0,
  };

  private onTabSelect = (index: number) => {
    if (this.props.onSelect && this.props.selectedIndex !== index) {
      this.props.onSelect(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { indicatorHeight, indicatorBackgroundColor, ...containerParameters } = source;

    return {
      container: containerParameters,
      item: {},
      indicator: {
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private renderIndicatorElement = (positions: number, style: ViewStyle): IndicatorElement => {
    const { indicatorStyle, selectedIndex } = this.props;

    return (
      <TabIndicator
        key={0}
        style={[style, styles.indicator, indicatorStyle]}
        selectedPosition={selectedIndex}
        positions={positions}
      />
    );
  };

  private renderTabElement = (element: BottomNavigationTabElement, index: number): BottomNavigationTabElement => {
    return React.cloneElement(element, {
      key: index,
      style: [styles.item, element.props.style],
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onTabSelect(index),
    });
  };

  private renderTabElements = (source: ChildrenProp): BottomNavigationTabElement[] => {
    return React.Children.map(source, this.renderTabElement);
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const tabElements: BottomNavigationTabElement[] = this.renderTabElements(this.props.children);

    const hasIndicator: boolean = style.indicator.height > 0;

    return [
      hasIndicator && this.renderIndicatorElement(tabElements.length, style.indicator),
      ...tabElements,
    ];
  };

  public render(): React.ReactNode {
    const { themedStyle, style, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [indicatorElement, ...tabElements] = this.renderComponentChildren(componentStyles);

    return (
      <View
        {...derivedProps}
        style={[container, styles.container, style]}>
        {indicatorElement}
        {tabElements}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
  },
});

export const BottomNavigation = styled<BottomNavigationProps>(BottomNavigationComponent);
