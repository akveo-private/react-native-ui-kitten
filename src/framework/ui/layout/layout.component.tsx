/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
} from '@kitten/theme';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

interface ComponentProps {
  level?: string;
  children?: ChildrenProp;
}

export type LayoutProps = StyledComponentProps & ViewProps & ComponentProps;
export type LayoutElement = React.ReactElement<LayoutProps>;

/**
 * `Layout` container component. Behaves like React Native `View`.
 * The key feature of using `Layout` instead of `View` is that
 * it automatically picks background color fitting to current theme.
 *
 * @extends React.Component
 *
 * @property {string} level - Determines background color level of component.
 * Can be `level='1'`, `level='2'`, `level='3'` or `level='4'`.
 *
 * @property {React.ReactElement<any> | React.ReactElement<any>[]} children - Determines the children of the component.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import {
 *   Layout,
 *   Text,
 * } from '@kitten/ui';
 *
 * export class LayoutShowcase extends React.Component {
 *
 *  public render(): React.ReactNode {
 *    return (
 *      <Layout style={styles.container}>
 *        <Text>Layout</Text>
 *      </Layout>
 *    );
 *  }
 *}
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     padding: 16,
 *   },
 * });
 * ```
 *
 * @overview-example Eva Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import {
 *   Layout,
 *   Text,
 * } from '@kitten/ui';
 *
 * export class LayoutShowcase extends React.Component {
 *
 *  public render(): React.ReactNode {
 *    return (
 *      <Layout level='2'>
 *        <Text>Layout</Text>
 *      </Layout>
 *    );
 *  }
 * }
 * ```
 * */

export class LayoutComponent extends React.Component<LayoutProps> {

  static styledComponentName: string = 'Layout';

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, ...derivedProps } = this.props;

    return (
      <View
        {...derivedProps}
        style={[themedStyle, style]}
      />
    );
  }
}

export const Layout = styled<LayoutProps>(LayoutComponent);
