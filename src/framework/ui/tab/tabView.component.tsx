/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { TabElement } from './tab.component';
import { TabBar } from './tabBar.component';
import { ViewPager } from '../viewPager/viewPager.component';

type TabContentElement = React.ReactElement<any>;
type ChildrenProp = TabElement | TabElement[];

class TabViewChildElement {
  tab: TabElement;
  content: TabContentElement;
}

class TabViewChildren {
  tabs: TabElement[] = [];
  content: TabContentElement[] = [];
}

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  tabBarStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type TabViewProps = ViewProps & ComponentProps;
export type TabViewElement = React.ReactElement<TabViewProps>;

/**
 * `TabView` is a dynamic tabset component. Allows flipping through the tab "pages".
 *
 * @extends React.Component
 **
 * @property {number} selectedIndex - Determines current tab index.
 *
 * @property {StyleProp<ViewStyle>} tabBarStyle - Determines style TabBar component.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of selected tab indicator.
 *
 * @property {(index: number) => void} onSelect - Fires on "page" select with corresponding index.
 *
 * @property {TabElement | TabElement[]} children - Determines children of the component.
 *
 * @property {(index: number) => boolean} shouldLoadComponent - Determines loading behavior particular page and can be
 * used for lazy loading.
 *
 * @property {(offset: number) => void} onOffsetChange - Fires on scroll event with current scroll offset.
 *
 * @property ViewProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { TabView, Tab } from 'react-native-ui-kitten';
 *
 * export class TabViewShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: 0,
 *   };
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <TabView
 *         selectedIndex={this.state.selectedIndex}
 *         onSelect={this.onSelect}>
 *         <Tab title='Dashboard'
 *           <Text>Tab 1</Text>
 *         </Tab>
 *         <Tab title='Settings'
 *           <Text>Tab 2</Text>
 *         </Tab>
 *       </TabView>
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example With Icons
 *
 * ```
 * // IMPORTANT: To use Icon component make sure to follow this guide:
 * // https://akveo.github.io/react-native-ui-kitten/docs/guides/eva-icons
 *
 * import React from 'react';
 * import { TabView, Tab, Icon } from 'react-native-ui-kitten';
 *
 * const DashboardIcon = (style) => (
 *   <Icon {...style} name='layout' />
 * );
 *
 * const SettingsIcon = (style) => (
 *   <Icon {...style} name='settings' />
 * );
 *
 * export class TabViewShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: 0,
 *   };
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   render() {
 *     return (
 *       <TabView
 *         selectedIndex={this.state.selectedIndex}
 *         onSelect={this.onSelect}>
 *         <Tab title='Dashboard' icon={DashboardIcon}
 *           <Text>Tab 1</Text>
 *         </Tab>
 *         <Tab title='Settings' icon={SettingsIcon}
 *           <Text>Tab 2</Text>
 *         </Tab>
 *       </TabView>
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Lazy Loading
 *
 * ```
 * import React from 'react';
 * import { TabView, Tab } from 'react-native-ui-kitten';
 *
 * export class TabViewShowcase extends React.Component {
 *
 *   state = {
 *     selectedIndex: 0,
 *   };
 *
 *   onSelect = (selectedIndex) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   shouldLoadTabContent = (index) => {
 *     return index === this.state.selectedIndex;
 *   };
 *
 *   render() {
 *     return (
 *       <TabView
 *         selectedIndex={this.state.selectedIndex}
 *         shouldLoadComponent={this.shouldLoadTabContent}
 *         onSelect={this.onSelect}>
 *         <Tab title='TAB 1'>
 *           <Text>Tab 1</Text>
 *         </Tab>
 *         <Tab title='TAB 2'>
 *           <Text>Tab 2</Text>
 *         </Tab>
 *         <Tab title='TAB 3'>
 *           <Text>Tab 3</Text>
 *         </Tab>
 *       </TabView>
 *     );
 *   }
 * }
 *
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { TabView, Tab } from 'react-native-ui-kitten';
 *
 * export const TabViewShowcase = (props) => (
 *   <TabView
 *     style={styles.tabView}
 *     tabBarStyle={styles.tabBar}
 *     indicatorStyle={styles.tabViewIndicator}>
 *     <Tab titleStyle={styles.tabTitle} title='TAB 1'>
 *       <Text>Tab 1</Text>
 *     </Tab>
 *     <Tab titleStyle={styles.tabTitle} title='TAB 2'>
 *       <Text>Tab 2</Text>
 *     </Tab>
 *     <Tab titleStyle={styles.tabTitle} title='TAB 3'>
 *       <Text>Tab 3</Text>
 *     </Tab>
 *   </TabView>
 * );
 * ```
 */
export class TabView extends React.Component<TabViewProps> {

  static defaultProps: Partial<TabViewProps> = {
    selectedIndex: 0,
  };

  private viewPagerRef: React.RefObject<ViewPager> = React.createRef();
  private tabBarRef: React.RefObject<any> = React.createRef();

  private onBarSelect = (index: number) => {
    const { current: viewPager } = this.viewPagerRef;

    viewPager.scrollToIndex({
      index,
      animated: true,
    });
  };

  private onPagerOffsetChange = (offset: number) => {
    const { current: tabBar } = this.tabBarRef;
    const tabCount: number = React.Children.count(tabBar.props.children);

    tabBar.scrollToOffset({ offset: offset / tabCount });
  };

  private onPagerSelect = (selectedIndex: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(selectedIndex);
    }
  };

  private renderComponentChild = (element: TabElement, index: number): TabViewChildElement => {
    return {
      tab: React.cloneElement(element, { key: index }),
      content: element.props.children,
    };
  };

  private renderComponentChildren = (source: ChildrenProp): TabViewChildren => {
    return React.Children.toArray(source).reduce((acc: TabViewChildren, element: TabElement, index: number) => {
      const { tab, content } = this.renderComponentChild(element, index);
      return {
        tabs: [...acc.tabs, tab],
        content: [...acc.content, content],
      };
    }, new TabViewChildren());
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, selectedIndex, children, tabBarStyle, indicatorStyle, ...derivedProps } = this.props;

    const { tabs, content } = this.renderComponentChildren(children);

    return (
      <React.Fragment>
        <TabBar
          style={tabBarStyle}
          ref={this.tabBarRef}
          selectedIndex={selectedIndex}
          indicatorStyle={indicatorStyle}
          onSelect={this.onBarSelect}>
          {tabs}
        </TabBar>
        <ViewPager
          ref={this.viewPagerRef}
          {...derivedProps}
          style={[styles.container, style]}
          selectedIndex={selectedIndex}
          shouldLoadComponent={this.props.shouldLoadComponent}
          onOffsetChange={this.onPagerOffsetChange}
          onSelect={this.onPagerSelect}>
          {content}
        </ViewPager>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
