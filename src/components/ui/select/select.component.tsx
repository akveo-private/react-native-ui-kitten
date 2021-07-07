/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  ImageProps,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TargetedEvent,
  TextProps,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {
  ChildrenWithProps,
  EvaInputSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  IndexPath,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { List } from '../list/list.component';
import { Popover } from '../popover/popover.component';
import { ChevronDown } from '../shared/chevronDown.component';
import { SelectGroupProps } from './selectGroup.component';
import {
  SelectItemElement,
  SelectItemProps,
} from './selectItem.component';
import {
  SelectItemDescriptor,
  SelectService,
} from './select.service';

type SelectStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

export interface SelectProps extends TouchableWebProps, SelectStyledProps {
  children?: ChildrenWithProps<SelectItemProps | SelectGroupProps>;
  selectedIndex?: IndexPath | IndexPath[];
  onSelect?: (index: IndexPath | IndexPath[]) => void;
  value?: RenderProp<TextProps> | React.ReactText;
  multiSelect?: boolean;
  placeholder?: RenderProp<TextProps> | React.ReactText;
  label?: RenderProp<TextProps> | React.ReactText;
  caption?: RenderProp<TextProps> | React.ReactText;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  status?: EvaStatus;
  size?: EvaInputSize;
}

export type SelectElement = React.ReactElement<SelectProps>;

interface State {
  listVisible: boolean;
}

const CHEVRON_DEG_COLLAPSED: number = -180;
const CHEVRON_DEG_EXPANDED: number = 0;
const CHEVRON_ANIM_DURATION: number = 200;

/**
 * A dropdown menu for displaying selectable options.
 * Select should contain SelectItem or SelectGroup components to provide a useful component.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets options list visible.
 *
 * @method {() => void} hide - Sets options list invisible.
 *
 * @method {() => void} focus - Focuses input field and sets options list visible.
 *
 * @method {() => void} blur - Removes focus from input field and sets options list invisible.
 *
 * @method {() => boolean} isFocused - Whether input field is currently focused and options list is visible.
 *
 * @method {() => void} clear - Removes all text from the Select.
 *
 * @property {ReactElement<SelectItemProps> | ReactElement<SelectItemProps>[]} children -
 * Items to be rendered within options list.
 *
 * @property {IndexPath | IndexPath[]} selectedIndex - Index or array of indices of selected options.
 * IndexPath `row: number, section?: number` - position of element in sectioned list.
 * Select becomes sectioned when SelectGroup is rendered within children.
 *
 * @property {(IndexPath | IndexPath[]) => void} onSelect - Called when option is pressed.
 * Called with `row: number` for non-grouped items.
 * Called with `row: number, section: number` for items rendered within group,
 * where row - index of item in group, section - index of group in list.
 * Called with array if *multiSelect* was set to true.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} value - String, number or a function component
 * to render for the selected options.
 * By default, calls *toString()* for each index in selectedIndex property.
 * If it is a function, expected to return a Text.
 *
 * @property {boolean} multiSelect - Whether multiple options can be selected.
 * If true, calls onSelect with IndexPath[] in arguments.
 * Otherwise, with IndexPath in arguments.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} placeholder - String, number or a function component
 * to render when there is no selected option.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} label - String, number or a function component
 * to render above input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} caption - String, number or a function component
 * to render below the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {() => void} onFocus - Called when options list becomes visible.
 *
 * @property {() => void} onBlur - Called when options list becomes invisible.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example SelectSimpleUsage
 *
 * @overview-example SelectIndexType
 * Select works with special index object - IndexPath.
 * For non-grouped items in select, there is only a `row` property.
 * Otherwise, `row` is an index of option within the group, section - index of group in options list.
 * ```
 * interface IndexPath {
 *   row: number;
 *   section?: number;
 * }
 * ```
 *
 * @overview-example SelectMultiSelect
 * Multiple options can be selected if `multiSelect` property is configured.
 * For multiple options, `onSelect` function is called with array if indices.
 *
 * @overview-example SelectWithGroups
 * Options may be grouped within `SelectGroup` component.
 *
 * @overview-example SelectDisplayValue
 * By default, Select displays a value by building strings for selected indices.
 * For a real-word examples, a `value` property should be configured.
 *
 * @overview-example SelectStates
 * Select can be disabled with `disabled` property.
 *
 * @overview-example SelectDisabledOptions
 * Same for options.
 *
 * @overview-example SelectStatus
 * It also may be marked with `status` property, which is useful within forms validation.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example SelectAccessories
 * Select may contain labels, captions and inner views by configuring `accessoryLeft` or `accessoryRight` properties.
 * Within Eva, Select accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example SelectSize
 * To resize Select, a `size` property may be used.
 *
 * @overview-example SelectStyling
 * Select and it's inner views can be styled by passing them as function components.
 * ```
 * import { Select, SelectItem, Text } from '@ui-kitten/components';
 *
 * <Select
 *   label={evaProps => <Text {...evaProps}>Label</Text>}
 *   caption={evaProps => <Text {...evaProps}>Caption</Text>}>
 *   <SelectItem title={evaProps => <Text {...evaProps}>Option 1</Text>} />
 * </Select>
 * ```
 *
 * @overview-example SelectTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */

@styled('Select')
export class Select extends React.Component<SelectProps, State> {

  static defaultProps = {
    placeholder: 'Select Option',
    selectedIndex: [],
  };

  public state: State = {
    listVisible: false,
  };

  private service: SelectService = new SelectService();
  private popoverRef = React.createRef<Popover>();
  private expandAnimation: Animated.Value = new Animated.Value(0);

  private get isMultiSelect(): boolean {
    return this.props.multiSelect;
  }

  private get data(): any[] {
    return React.Children.toArray(this.props.children || []);
  }

  private get selectedIndices(): IndexPath[] {
    if (!this.props.selectedIndex) {
      return [];
    }
    return Array.isArray(this.props.selectedIndex) ? this.props.selectedIndex : [this.props.selectedIndex];
  }

  private get expandToRotateInterpolation(): Animated.AnimatedInterpolation {
    return this.expandAnimation.interpolate({
      inputRange: [CHEVRON_DEG_COLLAPSED, CHEVRON_DEG_EXPANDED],
      outputRange: [`${CHEVRON_DEG_COLLAPSED}deg`, `${CHEVRON_DEG_EXPANDED}deg`],
    });
  }

  public show = (): void => {
    this.popoverRef.current?.show();
  };

  public hide = (): void => {
    this.popoverRef.current?.hide();
  };

  public focus = (): void => {
    this.setOptionsListVisible();
  };

  public blur = (): void => {
    this.setOptionsListInvisible();
  };

  public isFocused = (): boolean => {
    return this.state.listVisible;
  };

  public clear = (): void => {
    this.props.onSelect && this.props.onSelect(null);
  };

  private onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(event);
  };

  private onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(event);
  };

  private onPress = (): void => {
    this.setOptionsListVisible();
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(event);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(event);
  };

  private onItemPress = (descriptor: SelectItemDescriptor): void => {
    if (this.props.onSelect) {
      const selectedIndices = this.service.selectItem(this.isMultiSelect, descriptor, this.selectedIndices);
      !this.isMultiSelect && this.setOptionsListInvisible();
      this.props.onSelect(selectedIndices);
    }
  };

  private onBackdropPress = (): void => {
    this.setOptionsListInvisible();
  };

  private onListVisible = (): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.createExpandAnimation(-CHEVRON_DEG_COLLAPSED).start(() => {
      this.props.onFocus && this.props.onFocus(null);
    });
  };

  private onListInvisible = (): void => {
    this.props.eva.dispatch([]);
    this.createExpandAnimation(CHEVRON_DEG_EXPANDED).start(() => {
      this.props.onBlur && this.props.onBlur(null);
    });
  };

  private getComponentStyle = (style: StyleType) => {
    const {
      textMarginHorizontal,
      textFontFamily,
      textFontSize,
      textFontWeight,
      textColor,
      placeholderColor,
      placeholderFontSize,
      placeholderFontWeight,
      placeholderFontFamily,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      labelColor,
      labelFontSize,
      labelMarginBottom,
      labelFontWeight,
      labelFontFamily,
      captionColor,
      captionFontSize,
      captionFontWeight,
      captionFontFamily,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor,
      popoverMaxHeight,
      popoverBorderRadius,
      popoverBorderColor,
      popoverBorderWidth,
      ...inputParameters
    } = style;

    return {
      input: inputParameters,
      text: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        color: textColor,
      },
      placeholder: {
        marginHorizontal: textMarginHorizontal,
        fontSize: placeholderFontSize,
        fontWeight: placeholderFontWeight,
        fontFamily: placeholderFontFamily,
        color: placeholderColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      label: {
        marginBottom: labelMarginBottom,
        fontSize: labelFontSize,
        fontWeight: labelFontWeight,
        fontFamily: labelFontFamily,
        color: labelColor,
      },
      caption: {
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        fontFamily: captionFontFamily,
        color: captionColor,
      },
      popover: {
        maxHeight: popoverMaxHeight,
        borderRadius: popoverBorderRadius,
        borderWidth: popoverBorderWidth,
        borderColor: popoverBorderColor,
      },
    };
  };

  private setOptionsListVisible = (): void => {
    const hasData: boolean = this.data.length > 0;
    hasData && this.setState({ listVisible: true }, this.onListVisible);
  };

  private setOptionsListInvisible = (): void => {
    this.setState({ listVisible: false }, this.onListInvisible);
  };

  private createExpandAnimation = (toValue: number): Animated.CompositeAnimation => {
    return Animated.timing(this.expandAnimation, {
      toValue,
      duration: CHEVRON_ANIM_DURATION,
      useNativeDriver: Platform.OS !== 'web',
    });
  };

  private cloneItemWithProps = (el: SelectItemElement, props: SelectItemProps): SelectItemElement => {
    const nestedElements = React.Children.map(el.props.children, (nestedEl: SelectItemElement, index: number) => {
      const descriptor = this.service.createDescriptorForNestedElement(nestedEl, props.descriptor, index);
      const selected: boolean = this.service.isSelected(descriptor, this.selectedIndices);

      return this.cloneItemWithProps(nestedEl, { ...props, descriptor, selected, disabled: false });
    });

    return React.cloneElement(el, { ...props, ...el.props }, nestedElements);
  };

  private renderItem = (info: ListRenderItemInfo<SelectItemElement>): SelectItemElement => {
    const descriptor = this.service.createDescriptorForElement(info.item, this.isMultiSelect, info.index);
    const selected: boolean = this.service.isSelected(descriptor, this.selectedIndices);
    const disabled: boolean = this.service.isDisabled(descriptor);

    return this.cloneItemWithProps(info.item, { descriptor, selected, disabled, onPress: this.onItemPress });
  };

  private renderDefaultIconElement = (evaStyle): React.ReactElement => {
    const { tintColor, ...svgStyle } = evaStyle;
    return (
      <Animated.View style={{ transform: [{ rotate: this.expandToRotateInterpolation }] }}>
        <ChevronDown style={svgStyle} fill={tintColor} />
      </Animated.View>
    );
  };

  private renderInputElement = (props: SelectProps, evaStyle): TouchableWebElement => {
    const value = props.value || this.service.toStringSelected(this.selectedIndices);
    const textStyle: TextStyle = value && evaStyle.text;

    return (
      <TouchableWeb
        testID={props.testID}
        style={[styles.input, evaStyle.input]}
        onPress={this.onPress}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        disabled={props.disabled}>
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryLeft}
        />
        <FalsyText
          style={[styles.text, evaStyle.placeholder, textStyle]}
          numberOfLines={1}
          ellipsizeMode='tail'
          component={value || props.placeholder}
        />
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryRight}
          fallback={this.renderDefaultIconElement(evaStyle.icon)}
        />
      </TouchableWeb>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, label, caption, children, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View style={style}>
        <FalsyText
          style={[styles.label, evaStyle.label]}
          component={label}
        />
        <Popover
          ref={this.popoverRef}
          style={[styles.popover, evaStyle.popover]}
          visible={this.state.listVisible}
          fullWidth={true}
          anchor={this.renderInputElement(touchableProps, evaStyle)}
          onBackdropPress={this.onBackdropPress}>
          <List
            style={styles.list}
            data={this.data}
            bounces={false}
            renderItem={this.renderItem}
          />
        </Popover>
        <FalsyText
          style={[styles.caption, evaStyle.caption]}
          component={caption}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popover: {
    overflow: 'hidden',
  },
  list: {
    flexGrow: 0,
  },
  text: {
    flex: 1,
    textAlign: 'left',
  },
  label: {
    textAlign: 'left',
  },
  caption: {
    textAlign: 'left',
  },
});
