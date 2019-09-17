import React from 'react';
import {
  ScrollViewProps,
  View,
} from 'react-native';
import { ShowcaseSettings } from './showcaseSettings.component';
import { Showcase } from './showcase.component';
import {
  ComponentShowcase,
  ComponentShowcaseSetting,
} from './type';
import {
  ThemeContext,
  themes,
} from '../../../themes';
import { StyleType } from '@kitten/theme';

interface ContainerProps {
  style?: StyleType;
  showcase: ComponentShowcase;
  settings?: ComponentShowcaseSetting[];
  renderItem: (props: any) => React.ReactElement<any>;
}

interface State {
  settings: { [prop: string]: any };
}

export class ShowcaseContainer extends React.Component<ContainerProps, State> {

  public state: State = {
    settings: {},
  };

  private onSelectSetting = (selectedSettings: { [prop: string]: any }) => {
    const settings: { [prop: string]: any } = { ...this.state.settings, ...selectedSettings };

    this.setState({ settings });
  };

  private onResetSettings = () => {
    const settings = {};

    this.setState({ settings });
  };

  private renderContent = ({ toggleTheme }): React.ReactElement<ScrollViewProps> => {
    const { showcase, settings, renderItem, children, style } = this.props;

    return (
      <View style={[{ flex: 1 }, style]}>
        <ShowcaseSettings
          themes={themes}
          settings={settings}
          onSettingSelect={this.onSelectSetting}
          onThemeSelect={toggleTheme}
          onReset={this.onResetSettings}
        />
        {children}
        <Showcase
          showcase={showcase}
          renderItem={renderItem}
          settings={this.state.settings}
        />
      </View>
    );
  };

  public render(): React.ReactNode {
    return (
      <ThemeContext.Consumer>
        {this.renderContent}
      </ThemeContext.Consumer>
    );
  }
}
