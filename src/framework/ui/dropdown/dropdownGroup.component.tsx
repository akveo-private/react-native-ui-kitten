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
import {
  Text,
  TextElement,
} from '../text/text.component';
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

interface MainItemStatus {
  selected: boolean;
  indeterminate: boolean;
}

export type DropdownGroupProps = ComponentProps & Partial<DropdownItemProps> & StyledComponentProps;
export type DropdownGroupElement = React.ReactElement<DropdownGroupProps>;
type MainElement = TextElement | DropdownItemElement;

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

  private getMainItemStatus = (subItemsSelectedStatusArray: boolean[]): MainItemStatus => {
    const someSelected: boolean = subItemsSelectedStatusArray
      .some((item: boolean) => item === true);
    const everySelected: boolean = subItemsSelectedStatusArray
      .every((item: boolean) => item === true);

    switch (true) {
      case (someSelected && !everySelected):
        return { selected: true, indeterminate: true };
      case  !someSelected:
        return { selected: false, indeterminate: false };
      case everySelected:
        return { selected: true, indeterminate: false };
    }
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

  private renderSubItemsElements = (): DropdownItemElement[] => {
    const { item, themedStyle } = this.props;
    const { item: itemStyle } = this.getComponentStyle(themedStyle);

    return item.items
      .map((option: DropdownItemType, index: number) => {
        const element: DropdownItemElement = this.renderSubItem(option, index);

        return React.cloneElement(element, {
          ...option,
          style: [element.props.style, itemStyle],
          key: index,
        });
      });
  };

  private renderMultiSelectMainElement = (subItemsElements: DropdownItemElement[]): DropdownItemElement => {
    const { item, ...restProps } = this.props;
    const subItemsSelectedStatusArray: boolean[] = subItemsElements
      .map((subItem: DropdownItemElement) => subItem.props.selected);
    const itemStatus: MainItemStatus = this.getMainItemStatus(subItemsSelectedStatusArray);

    return (
      <DropdownItem
        {...restProps}
        {...itemStatus}
        item={item}
      />
    );
  };

  private renderDefaultMainElement = (): TextElement => {
    const { item, themedStyle } = this.props;
    const { text: textStyle } = this.getComponentStyle(themedStyle);

    return (
      <Text style={[textStyle, item.textStyle]}>{item.text}</Text>
    );
  };

  private renderMainElement = (subItemsElements: DropdownItemElement[]): MainElement => {
    const { multiSelect } = this.props;

    return multiSelect ? this.renderMultiSelectMainElement(subItemsElements) : this.renderDefaultMainElement();
  };

  public render(): DropdownGroupElement {
    const { themedStyle } = this.props;
    const { container, text: textStyle } = this.getComponentStyle(themedStyle);
    const subItemsElements: DropdownItemElement[] = this.renderSubItemsElements();
    const mainElement: MainElement = this.renderMainElement(subItemsElements);

    return (
      <View style={container}>
        {mainElement}
        {subItemsElements}
      </View>
    );
  }
}

export const DropdownGroup = styled<DropdownGroupProps>(DropdownGroupComponent);

