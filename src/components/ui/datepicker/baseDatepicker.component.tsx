/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWithoutFeedback,
} from '../../devsupport';
import {
  Interaction,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { BaseCalendarProps } from '../calendar/baseCalendar.component';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';
import { Popover } from '../popover/popover.component';
import {
  PopoverPlacement,
  PopoverPlacements,
} from '../popover/type';
import { TextProps } from '../text/text.component';

export interface BaseDatepickerProps<D = Date> extends StyledComponentProps,
  TouchableOpacityProps,
  BaseCalendarProps<D> {

  controlStyle?: StyleProp<ViewStyle>;
  label?: RenderProp<TextProps> | React.ReactText;
  caption?: RenderProp<TextProps> | React.ReactText;
  captionIcon?: RenderProp<Partial<ImageProps>>;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control' | string;
  size?: 'small' | 'medium' | 'large' | string;
  placeholder?: React.ReactText;
  placement?: PopoverPlacement | string;
  backdropStyle?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface State {
  visible: boolean;
}

export abstract class BaseDatepickerComponent<P, D = Date> extends React.Component<BaseDatepickerProps<D> & P, State> {

  static defaultProps: Partial<BaseDatepickerProps> = {
    dateService: new NativeDateService(),
    placeholder: 'dd/mm/yyyy',
    placement: PopoverPlacements.BOTTOM_START,
  };

  public state: State = {
    visible: false,
  };

  private popoverRef: React.RefObject<Popover> = React.createRef();

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
  };

  public focus = (): void => {
    this.setState({ visible: true }, this.onPickerVisible);
  };

  public blur = (): void => {
    this.setState({ visible: false }, this.onPickerInvisible);
  };

  public isFocused = (): boolean => {
    return this.state.visible;
  };

  public abstract clear(): void;

  protected abstract getComponentTitle(): React.ReactText;

  protected abstract renderCalendar(): CalendarElement<D> | RangeCalendarElement<D>;

  private getComponentStyle = (style: StyleType) => {
    const {
      textMarginHorizontal,
      textFontFamily,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      placeholderColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      labelColor,
      labelFontSize,
      labelLineHeight,
      labelMarginBottom,
      labelFontWeight,
      captionMarginTop,
      captionColor,
      captionFontSize,
      captionLineHeight,
      captionFontWeight,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor,
      popoverWidth,
      ...controlParameters
    } = style;

    return {
      control: controlParameters,
      captionContainer: {
        marginTop: captionMarginTop,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        color: textColor,
      },
      placeholder: {
        marginHorizontal: textMarginHorizontal,
        color: placeholderColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      label: {
        color: labelColor,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight,
        marginBottom: labelMarginBottom,
        fontWeight: labelFontWeight,
      },
      captionIcon: {
        width: captionIconWidth,
        height: captionIconHeight,
        tintColor: captionIconTintColor,
        marginRight: captionIconMarginRight,
      },
      captionLabel: {
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        lineHeight: captionLineHeight,
        color: captionColor,
      },
      popover: {
        width: popoverWidth,
        marginBottom: captionMarginTop,
      },
    };
  };

  private onPress = (event: GestureResponderEvent): void => {
    this.setPickerVisible();

    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private onPickerVisible = (): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  private onPickerInvisible = (): void => {
    this.props.eva.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  private setPickerVisible = (): void => {
    this.setState({ visible: true }, this.onPickerVisible);
  };

  private setPickerInvisible = (): void => {
    this.setState({ visible: false }, this.onPickerInvisible);
  };

  private renderInputElement = (props, evaStyle): React.ReactElement => {
    return (
      <TouchableWithoutFeedback
        {...props}
        testID='INPUT TOUCHABLE'
        style={[evaStyle.control, styles.control, this.props.controlStyle]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <FalsyFC
          style={evaStyle.icon}
          component={this.props.accessoryLeft}
        />
        <FalsyText
          style={evaStyle.text}
          numberOfLines={1}
          ellipsizeMode='tail'>
          {this.getComponentTitle()}
        </FalsyText>
        <FalsyFC
          style={evaStyle.icon}
          component={this.props.accessoryRight}
        />
      </TouchableWithoutFeedback>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const {
      eva,
      style,
      backdropStyle,
      controlStyle,
      placement,
      label,
      accessoryLeft,
      accessoryRight,
      caption,
      captionIcon,
      ...touchableProps
    } = this.props;

    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View style={style}>
        <FalsyText
          style={[evaStyle.label, styles.label]}
          component={label}
        />
        <Popover
          ref={this.popoverRef}
          style={[evaStyle.popover, styles.popover]}
          backdropStyle={backdropStyle}
          placement={placement}
          visible={this.state.visible}
          anchor={() => this.renderInputElement(touchableProps, evaStyle)}
          onBackdropPress={this.setPickerInvisible}>
          {this.renderCalendar()}
        </Popover>
        <View style={[evaStyle.captionContainer, styles.captionContainer]}>
          <FalsyFC
            style={evaStyle.captionIcon}
            component={captionIcon}
          />
          <FalsyText
            style={[evaStyle.captionLabel, styles.captionLabel]}
            component={caption}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popover: {
    borderWidth: 0,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    textAlign: 'left',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionLabel: {
    textAlign: 'left',
  },
});
