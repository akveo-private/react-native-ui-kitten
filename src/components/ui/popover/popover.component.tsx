/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  BackHandler,
  NativeEventSubscription,
  Platform 
} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
  FalsyFC,
  RenderProp,
  Overwrite,
} from '../../devsupport';
import { ModalService } from '../../theme';
import { ModalProps } from '../modal/modal.component';
import {
  PopoverView,
  PopoverViewElement,
  PopoverViewProps,
} from './popoverView.component';
import { PopoverPlacementService } from './placement.service';
import {
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

type PopoverModalProps = Overwrite<ModalProps, {
  children?: React.ReactElement;
}>;

export interface PopoverProps extends PopoverViewProps, PopoverModalProps {
  anchor: RenderProp | (() => RenderProp);
  fullWidth?: boolean;
}

export type PopoverElement = React.ReactElement<PopoverProps>;

interface State {
  childFrame: Frame;
  anchorFrame: Frame;
  forceMeasure: boolean;
}

/**
 * Displays a content positioned relative to another view.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets `content` component visible.
 *
 * @method {() => void} hide - Sets `content` component invisible.
 *
 * @property {boolean} visible - Whether content component is visible.
 * Defaults to false.
 *
 * @property {ReactElement | () => ReactElement} anchor - A component relative to which content component will be shown.
 *
 * @property {ReactElement} children - A component displayed within the popover.
 *
 * @property {() => void} onBackdropPress - Called when popover is visible and the underlying view was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {boolean} fullWidth - Whether a content component should take the width of `anchor`.
 *
 * @property {string | PopoverPlacement} placement - Position of the content component relative to the `anchor`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example PopoverSimpleUsage
 * Popover accepts it's content as child element and is displayed relative to `anchor` view.
 *
 * @overview-example PopoverPlacement
 * By default, it is displayed to the bottom of `anchor` view, but it is configurable with `placement` property.
 *
 * @overview-example PopoverFullWidth
 * Popover may take the full width of the anchor view by configuring `fullWidth` property.
 *
 * @overview-example PopoverStyledBackdrop
 * To style the underlying view, `backdropStyle` property may be used.
 */
export class Popover extends React.Component<PopoverProps, State> {

  static defaultProps: Partial<PopoverProps> = {
    placement: PopoverPlacements.BOTTOM,
  };

  public state: State = {
    childFrame: Frame.zero(),
    anchorFrame: Frame.zero(),
    forceMeasure: false,
  };

  private hardwareBackSubscription: NativeEventSubscription;
  private modalId: string;
  private contentPosition: Point = Point.outscreen();
  private placementService: PopoverPlacementService = new PopoverPlacementService();

  private actualPlacement: PopoverPlacement = this.preferredPlacement;

  private get preferredPlacement(): PopoverPlacement {
    return PopoverPlacements.parse(this.props.placement);
  }

  private get contentFlexPosition() {
    const { x: left, y: top } = this.contentPosition;
    return { left, top };
  }

  private get backdropConfig() {
    const { onBackdropPress, backdropStyle } = this.props;
    return {
      onBackdropPress,
      backdropStyle,
    };
  }

  public show = (): void => {
    this.modalId = ModalService.show(this.renderMeasuringPopoverElement(), this.backdropConfig);
  };

  public hide = (): void => {
    this.modalId = ModalService.hide(this.modalId);
  };

  private onHardwareBackPress = (): boolean => {
    this.hide();
    return false;
  };

  public componentDidUpdate(prevProps: PopoverProps): void {
    if (!this.modalId && this.props.visible && !this.state.forceMeasure) {
      this.setState({ forceMeasure: true });
      return;
    }

    if (this.modalId && !this.props.visible) {
      this.contentPosition = Point.outscreen();
      this.hide();
    }
  }

  public componentDidMount(): void {
    if(Platform.OS === 'android') {
      this.hardwareBackSubscription = BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
    }
  }

  public componentWillUnmount(): void {
    this.hardwareBackSubscription?.remove();
    this.hide();
  }

  private onChildMeasure = (childFrame: Frame): void => {
    this.state.childFrame = childFrame;

    if (!this.modalId && this.props.visible) {
      this.show();
      return;
    }

    if (this.modalId && this.props.visible) {
      ModalService.update(this.modalId, this.renderPopoverElement());
    }
  };

  private onContentMeasure = (anchorFrame: Frame): void => {
    this.state.anchorFrame = anchorFrame;

    const placementOptions: PlacementOptions = this.findPlacementOptions(anchorFrame, this.state.childFrame);
    this.actualPlacement = this.placementService.find(this.preferredPlacement, placementOptions);

    const displayFrame: Frame = this.actualPlacement.frame(placementOptions);
    this.contentPosition = displayFrame.origin;

    ModalService.update(this.modalId, this.renderPopoverElement());
  };

  private findPlacementOptions = (contentFrame: Frame, childFrame: Frame): PlacementOptions => {
    const width: number = this.props.fullWidth ? childFrame.size.width : contentFrame.size.width;
    const frame: Frame = new Frame(contentFrame.origin.x, contentFrame.origin.y, width, contentFrame.size.height);

    return new PlacementOptions(frame, childFrame, Frame.window(), Frame.zero());
  };

  private renderContentElement = (): React.ReactElement => {
    const contentElement: React.ReactElement = this.props.children;
    const fullWidthStyle = { width: this.state.childFrame.size.width };

    return React.cloneElement(contentElement, {
      style: [this.props.fullWidth && fullWidthStyle, contentElement.props.style],
    });
  };

  private renderPopoverElement = (): PopoverViewElement => {
    return (
      <PopoverView
        {...this.props}
        contentContainerStyle={[this.props.contentContainerStyle, styles.popoverView, this.contentFlexPosition]}
        placement={this.actualPlacement.reverse()}>
        <FalsyFC component={this.renderContentElement()} />
      </PopoverView>
    );
  };

  private renderMeasuringPopoverElement = (): MeasuringElement => {
    return (
      <MeasureElement 
        shouldUseTopInsets={ModalService.getShouldUseTopInsets}
        onMeasure={this.onContentMeasure}>
        <FalsyFC component={this.renderPopoverElement()} />
      </MeasureElement>
    );
  };

  public render(): React.ReactElement {
    const renderAnchor = typeof this.props.anchor === 'function' 
      ? this.props.anchor() 
      : this.props.anchor
    
    return (
      <MeasureElement
        shouldUseTopInsets={ModalService.getShouldUseTopInsets}
        force={this.state.forceMeasure}
        onMeasure={this.onChildMeasure}>
          <FalsyFC component={renderAnchor} />
      </MeasureElement>
    );
  }
}

const styles = StyleSheet.create({
  popoverView: {
    position: 'absolute',
  },
});
