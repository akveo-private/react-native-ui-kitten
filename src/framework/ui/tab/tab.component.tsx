import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  TextProps,
  ImageProps,
  ImageSourcePropType,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TabProps {
  title?: string;
  icon?: ImageSourcePropType;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type Props = TabProps & StyledComponentProps & TouchableWithoutFeedbackProps;

export class Tab extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selected: false,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {},
      title: source.text,
    };
  };

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private createTextComponent = (style: StyleType): React.ReactElement<TextProps> => {
    return (
      <Text
        style={style}
        key={1}>
        {this.props.title}
      </Text>
    );
  };

  private createImageComponent = (style: StyleType): React.ReactElement<ImageProps> => (
    <Image
      style={style}
      key={0}
      source={this.props.icon}
    />
  );

  private createComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, title } = this.props;

    return [
      icon ? this.createImageComponent(style.icon) : undefined,
      title ? this.createTextComponent(style.title) : undefined,
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;

    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const children: React.ReactNode = this.createComponentChildren(componentStyle);

    return (
      <TouchableWithoutFeedback
        {...derivedProps}
        onPress={this.onPress}>
        <View style={[style, componentStyle.container]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
