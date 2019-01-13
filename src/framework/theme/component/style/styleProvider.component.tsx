import React from 'react';
import {
  createStyle,
  getStyle,
  ThemeMappingType,
} from 'eva/rk-kit';
import {
  MappingProvider,
  MappingProviderProps,
} from '../mapping';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../theme';
import { StyleContext } from './styleContext';
import { createThemedStyle } from '../../service';
import {
  ThemeType,
  StyleType,
} from '../../type';

export type CreateStyleFunction = (component: string,
                                   appearance: string,
                                   variants: string[],
                                   states: string[]) => StyleType;

export type Props = MappingProviderProps & ThemeProviderProps;

interface State {
  mapping: ThemeMappingType;
  theme: ThemeType;
  createStyle: CreateStyleFunction;
}

export class StyleProvider extends React.PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      mapping: props.mapping,
      theme: props.theme,
      createStyle: this.createComponentStyle,
    };
  }

  private createComponentStyle = (component: string,
                                  appearance: string,
                                  variants: string[],
                                  states: string[]): StyleType => {

    let styleMapping = getStyle(component, appearance, variants, states);
    if (styleMapping) {
      return createThemedStyle(styleMapping, this.props.theme);
    } else {
      styleMapping = createStyle(this.props.mapping, component, appearance, variants, states);
      return createThemedStyle(styleMapping, this.props.theme);
    }
  };

  render() {
    return (
      <MappingProvider mapping={this.state.mapping}>
        <ThemeProvider theme={this.state.theme}>
          <StyleContext.Provider value={this.state.createStyle}>
            {this.props.children}
          </StyleContext.Provider>
        </ThemeProvider>
      </MappingProvider>
    );
  }
}
