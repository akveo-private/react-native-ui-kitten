/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  ViewStyle,
} from 'react-native';

/**
 * Singleton service designed to manage modal components.
 *
 * @type ModalService
 *
 * @method {(element: React.ReactElement<ModalPresentingBased>, config: ModalPresentingConfig) => string} show -
 * Shows component in a modal window. Returns its id.
 *
 * @method {(identifier: string) => string} hide - Hides component from a modal window and returns empty string.
 *
 * @method {(identifier: string, children: React.ReactNode) => void} update - Updates component from a modal window.
 * 
 * @property {boolean} getShouldUseTopInsets - returns `true` if StatusBar additional offset is not enabled, returns `false`
 * if StatusBar additional offset is enabled.
 * 
 * @property {boolean} setShouldUseTopInsets - `true` value enables StatusBar additional offset, `false` disables StatusBar 
 * additional offset
 *
 * @overview-example Simple Usage example
 * ModalService simple usage example.
 * 
 * ```
 * import React from 'react';
 * import { Layout, Button, Text, ModalService } from '@ui-kitten/components';
 *
 * export const ModalServiceShowcase = () => {
 *
 *   const modalID = '';
 *
 *   const showModal = () => {
 *     const contentElement = this.renderModalContentElement();
 *     this.modalID = ModalService.show(contentElement, { onBackdropPress: this.hideModal });
 *   };
 *
 *   const hideModal = () => {
 *     ModalService.hide(this.modalID);
 *   };
 *
 *   const renderModalContentElement = () => {
 *     return (
 *       <Layout>
 *         <Text>Hi, I'm modal!</Text>
 *       </Layout>
 *     );
 *   };
 *
 *   return (
 *     <Layout>
 *       <Button onPress={showModal}>SHOW MODAL</Button>
 *       <Button onPress={hideModal}>HIDE MODAL</Button>
 *     </Layout>
 *   );
 * }
 * ```
 * 
 * @overview-example StatusBar additional offset support configuration
 * ModalService could also control additional status bar offset configuration for all related UI Kitten measurable elements like 
 * [Modal](components/modal) and [Popover](components/popover).
 * 
 * ```
 * import React from 'react';
 * import * as eva from '@eva-design/eva';
 * import { ApplicationProvider, Layout, Text, ModalService } from '@ui-kitten/components';
 * 
 * ModalService.setShouldUseTopInsets = true //applies StatusBar additional offset
 * 
 * const HomeScreen = () => (
 *   <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 *     <Text category='h1'>HOME</Text>
 *   </Layout>
 * );
 * 
 * export default () => {
 * 
 *   return (
 *     <ApplicationProvider {...eva} theme={eva.light}>
 *       <HomeScreen />
 *     </ApplicationProvider>
 *   )
 * };
 * ```
 */
class ModalServiceType {

  panel: ModalPresenting | null = null;
  private shouldUseTopInsets: boolean = false;

  public mount(panel: ModalPresenting | null): void {
    this.panel = panel;
  }

  public unmount(): void {
    this.panel = null;
  }

  public show(element: React.ReactElement, config: ModalPresentingConfig): string {
    if (this.panel) {
      return this.panel.show(element, config);
    }
  }

  public update(identifier: string, children: React.ReactElement): void {
    if (this.panel) {
      this.panel.update(identifier, children);
    }
  }

  public hide(identifier: string): string {
    if (this.panel) {
      return this.panel.hide(identifier);
    }
  }

  public set setShouldUseTopInsets(state: boolean) {
    this.shouldUseTopInsets = state;
  };

  public get getShouldUseTopInsets(): boolean {
    return this.shouldUseTopInsets;
  }
}

export interface ModalPresentingConfig {
  backdropStyle?: StyleProp<ViewStyle>;
  onBackdropPress?: () => void;
}

export interface ModalPresenting {
  show(element: React.ReactElement, config: ModalPresentingConfig): string;

  hide(identifier: string): string;

  update(identifier: string, children: React.ReactElement): void;
}

export const ModalService = new ModalServiceType();
