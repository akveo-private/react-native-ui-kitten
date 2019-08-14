/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListRenderItemInfo,
  View,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Text } from '../text/text.component';
import {
  DropdownItem,
  DropdownItemElement,
  DropdownItemProps,
  DropdownItemType,
} from './droppdownItem.component';
import { SelectionStrategy } from './selection.strategy';

interface ComponentProps {
  multiSelect?: boolean;
  strategy: SelectionStrategy;
  renderItem?: (item: ListRenderItemInfo<DropdownItemType>) => React.ReactElement<any>;
}

export type DropdownGroupProps = ComponentProps & Partial<DropdownItemProps> & StyledComponentProps;
export type DropdownGroupElement = React.ReactElement<DropdownGroupProps>;

export class DropdownGroupComponent extends React.Component<DropdownGroupProps> {

  static styledComponentName: string = 'DropdownGroup';

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      itemPaddingLeft,
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textMarginHorizontal,
      ...containerStyles
    } = source;

    return {
      container: containerStyles,
      item: {
        paddingLeft: itemPaddingLeft,
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  };

  private renderSubItem = (option: DropdownItemType, index: number): DropdownItemElement => {
    const { item, renderItem, strategy, ...restProps } = this.props;
    const returningOption: ListRenderItemInfo<DropdownItemType> = {
      item: option,
      index: index,
      separators: null,
    };
    const selected: boolean = strategy.isSelected(option);

    return renderItem ? renderItem(returningOption) : (
      <DropdownItem
        {...restProps}
        selected={selected}
        item={option}
      />
    );
  };

  public render(): DropdownGroupElement {
    const { item, themedStyle } = this.props;
    const { container, item: itemStyle, text: textStyle } = this.getComponentStyle(themedStyle);

    const subItemsElements: DropdownItemElement[] = item.items
      .map((option: DropdownItemType, index: number) => {
        const element: DropdownItemElement = this.renderSubItem(option, index);

        return React.cloneElement(element, {
          ...option,
          style: [element.props.style, itemStyle],
          key: index,
        });
      });

    return (
      <View style={container}>
        <Text style={[textStyle, item.textStyle]}>{item.text}</Text>
        {subItemsElements}
      </View>
    );
  }
}

export const DropdownGroup = styled<DropdownGroupProps>(DropdownGroupComponent);

