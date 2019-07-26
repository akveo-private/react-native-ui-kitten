/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { RadioElement } from '../radio/radio.component';

type ChildrenProp = RadioElement | RadioElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export type RadioGroupProps = StyledComponentProps & ViewProps & ComponentProps;
export type RadioGroupElement = React.ReactElement<RadioGroupProps>;

/**
 * Renders a group of radio buttons.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<RadioProps> | React.ReactElement<RadioProps>[]} children -
 * Determines radio buttons in group.
 *
 * @property {number} selectedIndex - Determines the index of selected button
 *
 * @property {(index: number) => void} onChange - Fires when selected radio is changed.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import { Radio, RadioGroup } from 'react-native-ui-kitten';
 *
 * export class RadioGroupShowcase extends React.Component {
 *
 *   public state = {
 *     selectedIndex: 0,
 *   };
 *
 *   private onGroupSelectionChange = (selectedIndex: number) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <RadioGroup
 *         selectedIndex={this.state.selectedIndex}
 *         onChange={this.onGroupSelectionChange}>
 *         <Radio />
 *         <Radio />
 *         <Radio />
 *       </RadioGroup>
 *     );
 *   }
 * }
 * ```
 */

class RadioGroupComponent extends React.Component<RadioGroupProps> {

  static styledComponentName: string = 'RadioGroup';

  static defaultProps: Partial<RadioGroupProps> = {
    selectedIndex: -1,
  };

  private onRadioChange = (index: number) => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: source,
    };
  };

  private renderRadioElement = (element: RadioElement, index: number): RadioElement => {
    return React.cloneElement(element, {
      key: index,
      checked: this.props.selectedIndex === index,
      onChange: () => this.onRadioChange(index),
    });
  };

  private renderRadioElements = (source: RadioElement | RadioElement[]): RadioElement[] => {
    return React.Children.map(source, this.renderRadioElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const radioElements: RadioElement[] = this.renderRadioElements(children);

    return (
      <View
        {...derivedProps}
        style={[componentStyle.container, styles.container, style]}>
        {radioElements}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export const RadioGroup = styled<RadioGroupProps>(RadioGroupComponent);
