/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ThemeStyleType } from '@eva/core';
import { StyleConsumerService } from './styleConsumer.service';
import {
  Interaction,
  StyleType,
} from './type';
import { MappingContext } from '../mapping/mappingContext';
import { ThemeContext } from '../theme/themeContext';
import { ThemeType } from '../theme/type';

interface PrivateProps<T> {
  forwardedRef?: React.RefObject<T>;
}

export interface StyledComponentProps {
  appearance?: string;
  theme?: ThemeType;
  themedStyle?: StyleType;
  dispatch?: (interaction: Interaction[]) => void;
}

interface State {
  interaction: Interaction[];
}

export interface ContextProps {
  style: ThemeStyleType;
  theme: ThemeType;
}

export type StyledComponentClass<P> = React.ComponentClass<StyledComponentProps & P>;

export const styled = <P, T = {}>(Component: React.ComponentClass<P>): StyledComponentClass<P> => {

  // @ts-ignore
  if (!Component.styledComponentName) {
    console.warn('Styled components should specify corresponding style name.');
    return null;
  }

  type WrappingProps = PrivateProps<WrappedElementInstance> & WrappedProps;
  type WrappedProps = StyledComponentProps & P;
  type WrappingElement = React.ReactElement<WrappingProps>;
  type WrappedElement = React.ReactElement<WrappedProps>;
  type WrappedElementInstance = React.ReactInstance;

  class Wrapper extends React.Component<WrappingProps, State> {

    public state: State = {
      interaction: [],
    };

    private init: boolean = false;

    // Yes. This is not static because it is calculated once we got some meta from style context.
    private defaultProps: StyledComponentProps;
    private service: StyleConsumerService;

    private onInit = (context: ContextProps) => {

      // @ts-ignore
      this.service = new StyleConsumerService(Component.styledComponentName, context);
      this.defaultProps = this.service.createDefaultProps();

      this.init = true;
    };

    private onDispatch = (interaction: Interaction[]) => {
      this.setState({ interaction });
    };

    private withStyledProps = (source: P, context: ContextProps): WrappedProps => {
      const { interaction } = this.state;

      const props: WrappingProps = { ...this.defaultProps, ...source };

      return this.service.withStyledProps(props, context, interaction);
    };

    private renderWrappedElement = (context: ContextProps): WrappedElement => {
      if (!this.init) {
        this.onInit(context);
      }

      const { forwardedRef, ...restProps } = this.props;
      const props: P & StyledComponentProps = this.withStyledProps(restProps as P, context);

      return (
        <Component
          {...props}
          ref={forwardedRef}
          dispatch={this.onDispatch}
        />
      );
    };

    public render(): React.ReactNode {
      const StyledElement = this.renderWrappedElement;

      return (
        <MappingContext.Consumer>{(styles: ThemeStyleType): WrappedElement => (
          <ThemeContext.Consumer>{(theme: ThemeType): WrappedElement => (
            <StyledElement style={styles} theme={theme}/>
          )}</ThemeContext.Consumer>
        )}</MappingContext.Consumer>
      );
    }
  }

  const WrappingElement = (props: WrappingProps, ref: React.Ref<WrappedElementInstance>): WrappingElement => {
    return (
      <Wrapper
        {...props}
        forwardedRef={ref}
      />
    );
  };

  const ResultComponent = React.forwardRef<WrappedElementInstance, WrappingProps>(WrappingElement);

  ResultComponent.displayName = Component.displayName || Component.name;
  hoistNonReactStatics(ResultComponent, Component);

  // @ts-ignore
  return ResultComponent;
};
