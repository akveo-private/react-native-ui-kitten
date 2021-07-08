/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Platform,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { RTLService } from '../../devsupport';

export interface TabIndicatorProps extends ViewProps {
  positions: number;
  selectedPosition?: number;
}

export type TabIndicatorElement = React.ReactElement<TabIndicatorProps>;

export class TabIndicator extends React.Component<TabIndicatorProps> {

  static defaultProps: Partial<TabIndicatorProps> = {
    selectedPosition: 0,
  };
  private indicatorWidth: number = 0;
  private contentOffset: Animated.Value = new Animated.Value(0);

  public componentDidMount() {
    this.contentOffset.addListener(this.onContentOffsetAnimationStateChanged);
  }

  public componentDidUpdate() {
    const { selectedPosition: index } = this.props;

    this.scrollToIndex({
      index,
      animated: true,
    });
  }

  public componentWillUnmount() {
    this.contentOffset.removeAllListeners();
  }

  /**
   * scrolls indicator to passed index
   *
   * @param params (object) - {
   *  index: number,
   *  animated: boolean | undefined
   * }
   */
  public scrollToIndex(params: { index: number, animated?: boolean }) {
    const { index, ...rest } = params;
    const offset: number = this.indicatorWidth * index;

    this.scrollToOffset({ offset, ...rest });
  }

  /**
   * scrolls indicator to passed offset
   *
   * @param params (object) - {
   *  offset: number,
   *  animated: boolean | undefined
   * }
   */
  public scrollToOffset(params: { offset: number, animated?: boolean }) {
    this.createOffsetAnimation(params).start(this.onContentOffsetAnimationStateEnd);
  }

  private onContentOffsetAnimationStateChanged = (state: { value: number }) => {
    // no-op
  };

  private onContentOffsetAnimationStateEnd = (result: { finished: boolean }) => {
    // no-op
  };

  private createOffsetAnimation = (params: { offset: number, animated?: boolean }): Animated.CompositeAnimation => {
    return Animated.timing(this.contentOffset, {
      toValue: RTLService.select(params.offset, -params.offset),
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: Platform.OS !== 'web',
    });
  };

  private onLayout = (event: LayoutChangeEvent) => {
    this.indicatorWidth = event.nativeEvent.layout.width;

    this.scrollToOffset({
      offset: this.indicatorWidth * this.props.selectedPosition,
      animated: false,
    });
  };

  private getComponentStyle = (): ViewStyle => {
    const widthPercent: number = 100 / this.props.positions;

    return {
      width: `${widthPercent}%`,

      // @ts-ignore: RN has no types for `Animated` styles
      transform: [{ translateX: this.contentOffset }],
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, ...viewProps } = this.props;
    const evaStyle: ViewStyle = this.getComponentStyle();

    return (
      <Animated.View
        {...viewProps}
        style={[style, evaStyle]}
        onLayout={this.onLayout}
      />
    );
  }
}
