/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ControlMetaType,
  ControlThemedStyleType,
  ThemedStyleType,
} from '@eva-design/dss';
import isEqual from 'react-fast-compare';
import memoizeOne from 'memoize-one';
import { StyledComponentProps } from './styled';
import {
  Interaction,
  StyleService,
  StyleType,
} from './style.service';
import { ThemeType } from '../theme/theme.service';

const SEPARATOR_MAPPING_ENTRY: string = '.';
const DOC_ROOT: string = 'https://akveo.github.io/react-native-ui-kitten/docs';

interface StyleInfo {
  appearance: string;
  variants: string[];
  states: string[];
}

export class StyleConsumerService {

  private readonly name: string;
  private readonly meta: ControlMetaType;

  constructor(name: string, style: StyleType) {
    this.name = name;

    this.meta = this.safe(style[name], (generatedConfig): ControlMetaType => {
      return generatedConfig.meta;
    });

    if (!this.meta) {
      const message: string = [
        `\n${this.name}: unsupported configuration.`,
        'Using UI Kitten components is only possible with configuring ApplicationProvider.',
        `📖 Documentation: ${DOC_ROOT}/guides/getting-started#manual-installation`,
        '\nIn case you have all in place, there might be an incorrect usage of a "styled" function.',
        `📖 Documentation: ${DOC_ROOT}/design-system/custom-component-mapping`,
      ].join('\n');

      console.error(message);
    }

    this.getGeneratedStyleMapping = memoizeOne(this.getGeneratedStyleMapping.bind(this), isEqual)
  }

  public createDefaultProps<P extends object>(): StyledComponentProps {
    const appearance: string = this.getDefaultAppearance();
    const variants: { [key: string]: string } = this.getDefaultVariants();
    const states: { [key: string]: boolean } = this.getDefaultStates();

    return { appearance, ...variants, ...states };
  }

  public createStyleProp<P extends object>(source: P,
                                           style: StyleType,
                                           theme: ThemeType,
                                           interaction: Interaction[]): StyleType {

    const styleInfo: StyleInfo = this.getStyleInfo(source, this.withValidInteraction(interaction));
    const generatedMapping: StyleType = this.getGeneratedStyleMapping(style, styleInfo);

    if (!generatedMapping) {
      const message: string = [
        `${this.name}: unsupported configuration.`,
        `Check one of the following prop values: ${JSON.stringify(styleInfo, null, 2)}`,
        `📖 Documentation: ${DOC_ROOT}/components/${this.name.toLowerCase()}/api`,
      ].join('\n');

      console.warn(message);

      return this.createStyleProp({ ...source, ...this.createDefaultProps() }, style, theme, interaction);
    }

    const mapping: StyleType = this.withValidParameters(generatedMapping);

    return StyleService.createThemedEntry(mapping, theme);
  }

  private getGeneratedStyleMapping<P extends StyledComponentProps>(style: StyleType, info: StyleInfo): StyleType {

    return this.safe(style[this.name], (componentStyles: ControlThemedStyleType): ThemedStyleType => {
      const styleKeys: string[] = Object.keys(componentStyles.styles);
      const query: string = this.findGeneratedQuery(info, styleKeys);

      return componentStyles.styles[query];
    });
  }

  private withValidInteraction(interaction: Interaction[]): Interaction[] {
    const validInteractions: Interaction[] = interaction.filter((key: Interaction) => {
      return Object.keys(this.meta.states).includes(key);
    });

    if (validInteractions.length < interaction.length) {
      const message: string = [
        `${this.name}: unsupported configuration.`,
        `Check one of the following dispatched interactions: ${interaction}`,
        `📖 Documentation: ${DOC_ROOT}/design-system/custom-component-mapping`,
      ].join('\n');

      console.warn(message);
    }

    return validInteractions;
  }

  private withValidParameters(mapping: StyleType): StyleType {
    const invalidParameters: string[] = [];

    Object.keys(mapping).forEach((key: string) => {
      if (!Object.keys(this.meta.parameters).includes(key)) {
        invalidParameters.push(key);
        delete mapping[key];
      }
    });

    if (invalidParameters.length !== 0) {
      const message: string = [
        `${this.name}: unsupported configuration.`,
        `Unable to apply ${invalidParameters}`,
        'There might be an incorrect usage of mapping',
        `📖 Documentation: ${DOC_ROOT}/design-system/custom-component-mapping`,
      ].join('\n');

      console.warn(message);
    }

    return mapping;
  }

  private getStyleInfo<P extends StyledComponentProps>(props: P,
                                                       interaction: Interaction[]): StyleInfo {
    const variantProps: Partial<P> = this.getDerivedVariants(this.meta, props);
    const stateProps: Partial<P> = this.getDerivedStates(this.meta, props);

    const variants: string[] = Object.keys(variantProps).map((variant: string): string => {
      return variantProps[variant];
    });

    const states: string[] = Object.keys(stateProps);

    return {
      appearance: props.appearance,
      variants: variants,
      states: [...states, ...interaction],
    };
  }

  private getDefaultAppearance(): string {
    const matches: string[] = Object.keys(this.meta.appearances).filter((appearance: string): boolean => {
      return this.meta.appearances[appearance].default === true;
    });

    return matches[matches.length - 1];
  }

  private getDefaultVariants(): { [key: string]: any } {
    return this.transformObject(this.meta.variantGroups, (variants, group: string): string | undefined => {
      return Object.keys(variants[group]).find((variant: string): boolean => {

        return variants[group][variant].default === true;
      });
    });
  }

  private getDefaultStates(): { [key: string]: any } {
    return this.transformObject(this.meta.states, (states, state: string): boolean | undefined => {
      const isDefault: boolean = states[state].default === true;

      return isDefault ? isDefault : undefined;
    });
  }

  private getDerivedVariants<P extends StyledComponentProps>(meta: ControlMetaType, props: P): Partial<P> {
    return this.transformObject(props, (p: P, prop: string): string | undefined => {
      const isVariant: boolean = Object.keys(meta.variantGroups).includes(prop);

      return isVariant ? p[prop] : undefined;
    });
  }

  private getDerivedStates<P extends StyledComponentProps>(meta: ControlMetaType, props: P): Partial<P> {
    return this.transformObject(props, (p: P, prop: string): boolean => {
      const isState: boolean = Object.keys(meta.states).includes(prop);
      const isAssigned: boolean = p[prop] === true;

      return isState && isAssigned;
    });
  }

  /**
   * Iterates throw `value` object keys and fills it values with values provided by `transform` callback
   * If `transform` returns `undefined`, then appends nothing
   *
   * @param value (V extends object) - object to transform
   * @param transform - object key transformation callback
   */
  private transformObject<V extends object>(value: V, transform: (value: V, key: string) => any): Partial<V> {
    return Object.keys(value).reduce((acc: Partial<V>, key: string): any => {
      const nextValue: any = transform(value, key);

      return nextValue ? {
        ...acc,
        [key]: nextValue,
      } : acc;
    }, {});
  }

  /**
   * Finds identical keys across `source` keys array
   *
   * Example:
   *
   * source = ['default.error.small.checked', ...]
   * info = { appearance: 'default', variants: ['small', 'error'], states: ['checked'] }
   *
   * will return ['default', 'error', 'small', 'checked']
   *
   * @param info (StyleInfo) - component style info
   * @param source (string[]) - array of style keys
   *
   * @return (string | undefined) - key identical to some of `source` keys if presents
   */
  private findGeneratedQuery(info: StyleInfo, source: string[]): string | undefined {
    const query: string[] = [
      info.appearance,
      ...info.variants,
      ...info.states,
    ];

    return source.find((value) => this.compareArrays(query, value.split(SEPARATOR_MAPPING_ENTRY)));
  }

  /**
   * @param lhs (string[]) - comparable array
   * @param rhs (string[]) - comparing array
   *
   * @return true if all of lhs keys are included in rhs
   */
  private compareArrays(lhs: string[], rhs: string[]): boolean {
    if (lhs.length !== rhs.length) {
      return false;
    }

    return lhs.reduce((acc: boolean, current: string): boolean => acc && rhs.includes(current), true);
  }

  /**
   * Safely retrieves R value of T object with reducer
   *
   * @param value (T | undefined) - unsafe object which should be processed
   * @param reducer ((T) => R) - `value` processing lambda. Called if `value` is not `undefined`
   * @param fallback (R) - fallback value to return. Optional
   *
   * @return (R | undefined) - object returned by `reducer` if `value` is not `undefined`, `fallback` otherwise
   **/
  private safe<T, R>(value: T | undefined, reducer: (value: T) => R, fallback?: R): R | undefined {
    if (value) {
      return reducer(value);
    }

    return fallback;
  }
}
