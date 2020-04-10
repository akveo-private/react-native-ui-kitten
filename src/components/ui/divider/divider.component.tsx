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
import { Overwrite } from 'utility-types';
import {
  styled,
  StyledComponentProps,
} from '../../theme';

type DividerStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export type DividerProps = ViewProps & DividerStyledProps;
export type DividerElement = React.ReactElement<DividerProps>;

/**
 * A divider is a thin line that groups content in lists and layouts.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 */
class DividerComponent extends React.Component<DividerProps> {

  static styledComponentName: string = 'Divider';

  public render(): DividerElement {
    const { eva, style, ...viewProps } = this.props;

    return (
      <View
        {...viewProps}
        style={[eva.style, style]}
      />
    );
  }
}

export const Divider = styled<DividerProps>(DividerComponent);
