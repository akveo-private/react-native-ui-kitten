/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  ModalService,
  StyleType,
} from '@kitten/theme';
import {
  MeasureNode,
  MeasureNodeProps,
  MeasuringElementProps,
  MeasureResult,
} from '../popover/measure.component';
import { Size } from '../popover/type';
import { ModalPresentingBased } from '../support/typings';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const TAG_CHILD: string = 'Modal';
const initialContentSize: Size = { width: 0, height: 0 };
export const baseModalTestId: string = '@modal/base';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

export interface BackdropStyle {
  backgroundColor: string;
  opacity: number;
}

interface ComponentProps {
  visible: boolean;
  children: ChildrenProp;
  backdropStyle?: BackdropStyle;
}

export type ModalProps = ViewProps & ComponentProps & ModalPresentingBased;
export type ModalElement = React.ReactElement<ModalProps>;

/**
 * `Modal` component is a wrapper than presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @property {boolean} visible - Determines whether component is visible. By default is false.
 *
 * @property {React.ReactElement<any> | React.ReactElement<any>[]} children -
 * Determines component's children.
 *
 * @property {boolean} allowBackdrop - Determines whether user can tap on back-drop.
 * Default is `false`.
 *
 * @property {BackdropStyle} backdropStyle - Determines the style of backdrop.
 *
 * @property {() => void} onBackdropPress - Determines component's behavior when the user is
 * tapping on back-drop.
 *
 * @property ViewProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import {
 *   StyleSheet,
 *   View,
 *   ViewProps,
 * } from 'react-native';
 * import {
 *   Button,
 *   Modal,
 *   Text,
 *   Layout,
 * } from 'react-native-ui-kitten';
 *
 * interface State {
 *   modalVisible: boolean;
 * }
 *
 * export class ModalShowcase extends React.Component<any, State> {
 *
 *   public state: State = {
 *     modalVisible: false,
 *   };
 *
 *   private setModalVisible = (): void => {
 *     const modalVisible: boolean = !this.state.modalVisible;
 *
 *     this.setState({ modalVisible });
 *   };
 *
 *   private renderModalElement = (): React.ReactElement<ViewProps> => {
 *     return (
 *       <Layout
 *         level='3'
 *         style={styles.modalContainer}>
 *         <Text>This is modal</Text>
 *         <Button onPress={this.setModalVisible}>Hide Modal</Button>
 *       </Layout>
 *     );
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <View style={styles.container}>
 *         <Button onPress={this.setModalVisible}>Show Modal</Button>
 *         <Modal visible={this.state.modalVisible}>
 *           {this.renderModalElement()}
 *         </Modal>
 *       </View>
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     padding: 16,
 *   },
 *   modalContainer: {
 *     width: 200,
 *     height: 200,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *   },
 * });
 * ```
 *
 * @example With Backdrop
 *
 * ```
 * import React from 'react';
 * import {
 *   StyleSheet,
 *   View,
 *   ViewProps,
 * } from 'react-native';
 * import {
 *   Button,
 *   Modal,
 *   Text,
 *   Layout,
 * } from 'react-native-ui-kitten';
 *
 * interface State {
 *   modalVisible: boolean;
 * }
 *
 * export class ModalShowcase extends React.Component<any, State> {
 *
 *   public state: State = {
 *     modalVisible: false,
 *   };
 *
 *   private setModalVisible = (): void => {
 *     const modalVisible: boolean = !this.state.modalVisible;
 *
 *     this.setState({ modalVisible });
 *   };
 *
 *   private renderModalElement = (): React.ReactElement<ViewProps> => {
 *     return (
 *       <Layout
 *         level='3'
 *         style={styles.modalContainer}>
 *         <Text>This is modal</Text>
 *         <Button onPress={this.setModalVisible}>Hide Modal</Button>
 *       </Layout>
 *     );
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <View style={styles.container}>
 *         <Button onPress={this.setModalVisible}>Show Modal</Button>
 *         <Modal
 *           allowBackdrop={true}
 *           backdropStyle={{ backgroundColor: 'black', opacity: 0.5 }}
 *           onBackdropPress={this.setModalVisible}
 *           visible={this.state.modalVisible}>
 *           {this.renderModalElement()}
 *         </Modal>
 *       </View>
 *     );
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     padding: 16,
 *   },
 *   modalContainer: {
 *     width: 200,
 *     height: 200,
 *     justifyContent: 'center',
 *     alignItems: 'center',
 *   },
 * });
 * ```
 * */

export class Modal extends React.Component<ModalProps> {

  static defaultProps: Partial<ModalProps> = {
    allowBackdrop: false,
    onBackdropPress: () => null,
  };

  private contentSize: Size = initialContentSize;
  private id: string = '';

  public componentDidUpdate(prevProps: ModalProps): void {
    if (prevProps.visible !== this.props.visible) {
      this.handleVisibility(this.props);
    } else if (prevProps.visible && this.props.visible) {
      ModalService.update(this.id, this.props.children);
    }
  }

  private handleVisibility = (props: ModalProps): void => {
    const { allowBackdrop, onBackdropPress } = this.props;

    if (props.visible) {
      const element: React.ReactElement = this.renderModal();
      this.id = ModalService.show(element, { allowBackdrop, onBackdropPress });
    } else {
      ModalService.hide(this.id);
      this.id = '';
    }
  };

  private getAbsoluteRelatedStyle = (): StyleType => {
    const { width, height } = this.contentSize;

    return {
      top: (screenHeight - height) / 2,
      left: (screenWidth - width) / 2,
    };
  };

  private onMeasure = (result: MeasureResult): void => {
    this.contentSize = result[TAG_CHILD].size;
  };

  private renderBaseModal = (): React.ReactElement<ViewProps> => {
    const { style, children, ...restProps } = this.props;
    const absoluteRelatedStyle: StyleType = this.getAbsoluteRelatedStyle();
    const measuringProps: MeasuringElementProps = { tag: TAG_CHILD };

    return (
      <View
        {...restProps}
        {...measuringProps}
        testID={baseModalTestId}
        key={TAG_CHILD}
        style={[styles.container, absoluteRelatedStyle, style]}>
        {children}
      </View>
    );
  };

  private renderModal = (): React.ReactElement => {
    const { backdropStyle } = this.props;
    const modal: React.ReactElement<ViewProps> = this.renderBaseModal();

    return backdropStyle ? (
      <React.Fragment>
        <View
          pointerEvents='box-none'
          style={[styles.backdropBaseStyles, backdropStyle]}/>
        {modal}
      </React.Fragment>
    ) : modal;
  };

  private renderMeasureNode = (): React.ReactElement<MeasureNodeProps> => {
    const modal: React.ReactElement = this.renderBaseModal();
    const measureStyledModal: React.ReactElement = React.cloneElement(modal, {
      style: [modal.props.style, styles.hiddenModal],
      key: TAG_CHILD,
      pointerEvents: 'none',
    });

    return (
      <MeasureNode onResult={this.onMeasure}>
        {[measureStyledModal]}
      </MeasureNode>
    );
  };

  public render(): React.ReactNode {
    return this.renderMeasureNode();
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  hiddenModal: {
    opacity: 0,
  },
  backdropBaseStyles: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
});
