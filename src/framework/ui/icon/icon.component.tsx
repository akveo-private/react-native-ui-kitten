import React from 'react';
import {
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  getIconAnimation,
  IconAnimation,
  IconAnimationRegistry,
} from './iconAnimation';
import {
  IconRegistryService,
  RegisteredIcon,
} from './service/iconRegistry.service';
import { AnimationConfig } from '../animation';

interface ComponentProps {
  name: string;
  pack?: string;
  animation?: keyof IconAnimationRegistry;
  animationConfig?: AnimationConfig;
}

export type IconProps<T = {}> = ComponentProps & T;
export type IconElement<T> = React.ReactElement<T>;

/**
 * `Icon` component with animation support. Allows to render any ReactElement registered for a specific name.
 * Starting from UI Kitten 4.2, there is `@ui-kitten/eva-icons` module
 * that renders any icon from eva-icons package in `svg` format.
 * It allows easily use icons in any component that has `icon` prop
 *
 * @extends React.Component
 *
 * @method {(callback?: Animated.EndCallback) => void} startAnimation - Toggle animation to start.
 *
 * @method {() => void} stopAnimation - Toggle animation to stop.
 *
 * @property {string} name - Name of registered icon.
 *
 * @property {string} pack - Name of icon pack that is able to provide an icon for specified name.
 *
 * @property {string} animation - Animation name. Available `zoom`, `pulse` and `shake`. Default is `zoom`.
 *
 * @property {AnimationConfig} animationConfig - Determines animation config. Extends `Animated.AnimationConfig`.
 *
 * @overview-example Register Icons
 *
 * ```
 * import React from 'react';
 * import { mapping, light as lightTheme } from '@eva-design/eva';
 * import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
 * import { EvaIconsPack } from '@ui-kitten/eva-icons'; // <-- Make sure it is installed. npm i @ui-kitten/eva-icons
 * import { Application } from './path-to/root.component';
 *
 * export default class App extends React.Component {
 *
 *   render() {
 *     return (
 *       <ApplicationProvider
 *         mapping={mapping}
 *         theme={lightTheme}>
 *         <IconRegistry icons={EvaIconsPack}/>
 *         <Application/>
 *       </ApplicationProvider>
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * export const StarIcon = (props) => (
 *   <Icon name='star'/>
 * );
 * ```
 *
 * @overview-example Using with UI Kitten components
 *
 * ```
 * import React from 'react';
 * import { Input, Button, Icon } from 'react-native-ui-kitten';
 *
 * const StarIcon = (style) => (
 *   <Icon {...style} name='star' />
 * );
 *
 * export const StarButton = (props) => (
 *   <Button icon={StarIcon}>BUTTON</Button>
 * );
 *
 * export const StarInput = (props) => (
 *   <Input icon={StarIcon} />
 * );
 * ```
 *
 * @overview-example Using Assets
 *
 * ```
 * import React from 'react';
 * import { Image } from 'react-native';
 * import { Button } from 'react-native-ui-kitten';
 *
 * const StarIcon = (style) => (
 *   <Image style={style} source={require('path-to-assets/local-image.png')} />
 * );
 *
 * export const StarButton = (props) => (
 *   <Button icon={StarIcon}>BUTTON</Button>
 * );
 * ```
 *
 * @overview-example Animation Usage
 *
 * ```
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * const iconRef = React.createRef();
 *
 * export const StarIcon = (props) => (
 *   <Icon ref={iconRef} name='star' animation='shake'/>
 * );
 *
 * iconRef.current.startAnimation();
 * ```
 *
 * @example Infinite Animation
 *
 * ```
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * const iconRef = React.createRef();
 *
 * export const StarIcon = (props) => (
 *   <Icon
 *     ref={iconRef}
 *     name='star'
 *     animation='shake'
 *     animationConfig={{
         cycles: -1,
       }}
 *   />
 * );
 *
 * iconRef.current.startAnimation();
 * ```
 *
 * @example Password Input
 *
 * ```
 * import React from 'react';
 * import { Input, Icon } from 'react-native-ui-kitten';
 *
 * export class PasswordInput extends React.Component {
 *
 *  state = {
 *    passwordVisible: false,
 *  };
 *
 *  onPasswordIconPress = () => {
 *    const passwordVisible = !this.state.passwordVisible;
 *    this.setState({ passwordVisible });
 *  };
 *
 *  renderPasswordIcon = (style) => (
 *    <Icon
 *      name={this.state.passwordVisible ? 'eye' : 'eye-off'}
 *      {...style}
 *    />
 *  );
 *
 *  render() {
 *    return (
 *      <Input
 *        icon={this.renderPasswordIcon}
 *        onIconPress={this.onPasswordIconPress}
 *        secureTextEntry={!this.state.passwordVisible}
 *      />
 *    );
 *  }
 * }
 * ```
 *
 * @example Like Button
 *
 * ```
 * import React from 'react';
 * import { Button, Icon } from 'react-native-ui-kitten';
 *
 * export class LikeButton extends React.Component {
 *
 *  state = {
 *    liked: false,
 *  };
 *
 *  onPress = () => {
 *    const liked = !this.state.liked;
 *    this.setState({ liked });
 *  };
 *
 *  renderHeartIcon = (style) => (
 *    <Icon
 *      name={this.state.liked ? 'heart' : 'heart-outline'}
 *      {...style}
 *    />
 *  );
 *
 *  render() {
 *    return (
 *      <Button
 *        icon={this.renderHeartIcon}
 *        onPress={this.onPress}
 *      />
 *    );
 *  }
 * }
 * ```
 */
export class Icon<T> extends React.Component<IconProps<T>> {

  static defaultProps: Partial<IconProps> = {
    animation: 'zoom',
  };

  private readonly animation: IconAnimation;

  constructor(props: IconProps<T>) {
    super(props);
    this.animation = getIconAnimation(props.animation, props.animationConfig);
  }

  public componentWillUnmount() {
    this.animation.release();
  }

  public startAnimation = (callback?: Animated.EndCallback) => {
    this.animation.start(callback);
  };

  public stopAnimation = () => {
    this.animation.stop();
  };

  private getComponentStyle = (): StyleProp<ViewStyle> => {
    return this.animation.toProps();
  };

  public render(): React.ReactElement<T> {
    const { name, pack, ...restProps } = this.props;
    const registeredIcon: RegisteredIcon<T> = IconRegistryService.getIcon(name, pack);

    return (
      <Animated.View {...this.getComponentStyle()}>
        {registeredIcon.icon.toReactElement(restProps as T)}
      </Animated.View>
    );
  }
}
