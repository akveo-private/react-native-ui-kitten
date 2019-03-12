import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
  ImageProps,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';

interface ListDerivedProps {
  index?: number;
}

interface TemplateBaseProps {
  index: number;
  icon: (index: number, style: StyleType) => React.ReactElement<ImageProps>;
  accessory: (index: number, style: StyleType) => React.ReactElement<any>;
}

interface TemplateTitleProps extends Partial<TemplateBaseProps> {
  title: string;
  description?: string;
}

interface TemplateDescriptionProps extends Partial<TemplateBaseProps> {
  title?: string;
  description: string;
}

// @ts-ignore: props override
interface TouchableOpacityIndexedProps extends TouchableOpacityProps {
  onPress?: (index: number, event: GestureResponderEvent) => void;
  onPressIn?: (index: number, event: GestureResponderEvent) => void;
  onPressOut?: (index: number, event: GestureResponderEvent) => void;
  onLongPress?: (index: number, event: GestureResponderEvent) => void;
}

type ListItemProps = (TemplateTitleProps | TemplateDescriptionProps) & ListDerivedProps;

const Text = styled<TextComponent, TextProps>(TextComponent);

export type Props = ListItemProps & StyledComponentProps & TouchableOpacityIndexedProps;

export class ListItem extends React.Component<Props> {

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(this.props.index, event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(this.props.index, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(this.props.index, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props.index, event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { icon, title, description, accessory, ...container } = source;

    return {
      container: container,
      icon: icon,
      title: title,
      description: description,
      accessory: accessory,
    };
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    // @ts-ignore: will be not executed if `icon` prop is provided
    const { index, icon } = this.props;

    const iconElement: React.ReactElement<ImageProps> = icon(index, style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, iconElement.props.style, styles.icon],
    });
  };

  private renderContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const contentChildren: React.ReactNode = this.renderContentElementChildren(style);

    return (
      <View
        key={1}
        style={[style, styles.contentContainer]}>
        {contentChildren}
      </View>
    );
  };

  private renderTitleElement = (style: StyleType): React.ReactElement<TextProps> => {
    // @ts-ignore: will be not executed if `title` property is provided
    const { title } = this.props;

    return (
      <Text
        style={[style, styles.title]}
        key={2}>
        {title}
      </Text>
    );
  };

  private renderDescriptionElement = (style: StyleType): React.ReactElement<TextProps> => {
    // @ts-ignore: will be not executed if `description` property is provided
    const { description } = this.props;

    return (
      <Text
        key={3}
        style={[style, styles.description]}>
        {description}
      </Text>
    );
  };

  private renderAccessoryElement = (style: StyleType): React.ReactElement<any> => {
    // @ts-ignore: will be not executed if `accessory` property is provided
    const { index, accessory } = this.props;

    const accessoryElement: React.ReactElement<any> = accessory(index, style);

    return React.cloneElement(accessoryElement, {
      key: 4,
      style: [accessoryElement.props.style, style, styles.accessory],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNode => {
    // @ts-ignore: will be not executed if any of properties below is provided
    const { title, description } = this.props;

    const hasTitle: boolean = title !== undefined;
    const hasDescription: boolean = description !== undefined;

    return [
      hasTitle ? this.renderTitleElement(style.title) : undefined,
      hasDescription ? this.renderDescriptionElement(style.description) : undefined,
    ];
  };

  private renderTemplateChildren = (style: StyleType): React.ReactNode => {
    // @ts-ignore: following props could not be provided
    const { icon, title, description, accessory } = this.props;

    const hasIcon: boolean = icon !== undefined;
    const hasContent: boolean = title !== undefined || description !== undefined;
    const hasAccessory: boolean = accessory !== undefined;

    return [
      hasIcon ? this.renderIconElement(style.icon) : undefined,
      hasContent ? this.renderContentElement(style) : undefined,
      hasAccessory ? this.renderAccessoryElement(style.accessory) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderTemplateChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={[container, style, styles.container]}
        activeOpacity={1.0}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  icon: {},
  title: {},
  description: {},
  accessory: {},
});
