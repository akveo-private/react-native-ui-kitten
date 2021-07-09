/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { RenderProp } from '../../devsupport';
import { styled } from '../../theme';
import {
  BaseDatepickerComponent,
  BaseDatepickerProps,
} from './baseDatepicker.component';
import {
  Calendar,
  CalendarElement,
  CalendarProps,
} from '../calendar/calendar.component';
import { TextProps } from '../text/text.component';

export interface DatepickerProps<D = Date> extends BaseDatepickerProps<D>, CalendarProps<D> {
  autoDismiss?: boolean;
}

export type DatepickerElement<D = Date> = React.ReactElement<DatepickerProps<D>>;

/**
 * Date picker provides a simple way to select a date within a picker displayed in modal.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets picker visible.
 *
 * @method {() => void} hide - Sets picker invisible.
 *
 * @method {() => void} focus - Focuses Datepicker and sets it visible.
 *
 * @method {() => void} blur - Removes focus from Datepicker and sets it invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the Datepicker is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Datepicker.
 *
 * @property {D} date - Date which is currently selected.
 * Defaults to current date.
 *
 * @property {(D) => void} onSelect - Called when date cell is pressed.
 *
 * @property {boolean} autoDismiss - Will hide the calendar when date cell is pressed.
 * Defaults to *true*.
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {DateService<D>} dateService - Date service that is able to work with a date objects.
 * Defaults to Native Date service that works with JS Date.
 * Allows using different types of date like Moment.js or date-fns.
 * Moment.js service can be provided by installing `@ui-kitten/moment` package.
 * date-fns service can be provided by installing `@ui-kitten/date-fns` package.
 *
 * @property {boolean} boundingMonth - Defines if previous and next months should be rendered in the current month view.
 *
 * @property {(D, NamedStyles) => ReactElement} renderDay - Function component
 * to render instead of default day cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(D, NamedStyles) => ReactElement} renderMonth - Function component
 * to render instead of default month cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(D, NamedStyles) => ReactElement} renderYear - Function component
 * to render instead of default year cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar.
 * Can be `CalendarViewModes.DATE`, `CalendarViewModes.MONTH` or `CalendarViewModes.YEAR`.
 * Defaults to *CalendarViewModes.DATE*.
 *
 * @property {(date: D) => string} title - A function to transform selected date to a string displayed in header.
 *
 * @property {(date: D) => boolean} filter - A function to determine whether particular date cells should be disabled.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} placeholder - String, number or a function component
 * to render when input field is empty.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} caption - Function component to render below Input view.
 * Expected to return View.
 *
 * @property {() => void} onFocus - Called when picker becomes visible.
 *
 * @property {() => void} onBlur - Called when picker becomes invisible.
 *
 * @property {string | PopoverPlacement} placement - Position of the picker relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 * 
 * @property {(CalendarViewMode) => void} renderArrowLeft - Function component
 * to render instead of default previous arrow.
 * Accepts viewMode argument which returns string with current calendar view ("YEAR", "MONTH", "DATE").
 * 
 * @property {(CalendarViewMode) => void} renderArrowRight - Function component
 * to render instead of default next arrow.
 * Accepts viewMode argument which returns string with current calendar view ("YEAR", "MONTH", "DATE").
 * 
 * @property {(D, CalendarViewMode) => void} onVisibleDateChange - Called when navigating to the previous or next month / year.
 * viewMode returns string with current calendar view ("YEAR", "MONTH", "DATE").
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example DatepickerSimpleUsage
 * Both range and date pickers support all parameters as calendar, so, check Calendar API for additional info.
 *
 * @overview-example DatepickerAccessories
 * Pickers may contain labels, captions and inner views by configuring `accessoryLeft` or `accessoryRight` properties.
 * Within Eva, Datepicker accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example DatepickerFilters
 * Picker may accept minimal and maximum dates, filter functions, and `boundingMonth` property,
 * which disables displaying previous month dates at the current date view.
 *
 * @overview-example DatepickerLocaleSettings
 * Also, it is possible to setup locale by configuring Date Service.
 *
 * @overview-example DatepickerStatus
 * Datepicker may be marked with `status` property, which is useful within forms validation.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example DatepickerSize
 * To resize Datepicker, a `size` property may be used.
 *
 * @overview-example DatepickerMoment
 * Datepicker is able to work with Moment, by configuring date service.
 * In order to use Moment, `@ui-kitten/moment` package is required.
 *
 * @overview-example DatepickerCustomDay
 * To render custom cells, `renderDay`, `renderMonth` and `renderYear` properties may be used.
 *
 * @overview-example DatepickerStyling
 * Datepicker and it's inner views can be styled by passing them as function components.
 * ```
 * import { Datepicker, Text } '@ui-kitten/components';
 *
 * <Datepicker
 *   controlStyle={{ ... }}
 *   label={evaProps => <Text {...evaProps}>Label</Text>}
 *   caption={evaProps => <Text {...evaProps}>Caption</Text>}
 * />
 * ```
 *
 * @overview-example DatepickerTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
@styled('Datepicker')
export class Datepicker<D = Date> extends BaseDatepickerComponent<DatepickerProps<D>, D> {

  static defaultProps: DatepickerProps = {
    ...BaseDatepickerComponent.defaultProps,
    autoDismiss: true,
  };

  constructor(props: DatepickerProps<D>) {
    super(props);
    this.clear = this.clear.bind(this);
  }

  private get calendarProps(): CalendarProps<D> {
    return {
      min: this.props.min,
      max: this.props.max,
      date: this.props.date,
      dateService: this.props.dateService,
      boundingMonth: this.props.boundingMonth,
      startView: this.props.startView,
      filter: this.props.filter,
      title: this.props.title,
      onSelect: this.props.onSelect,
      renderDay: this.props.renderDay,
      renderMonth: this.props.renderMonth,
      renderYear: this.props.renderYear,
      renderArrowRight: this.props.renderArrowRight,
      renderArrowLeft: this.props.renderArrowLeft,
      onVisibleDateChange: this.props.onVisibleDateChange,
    };
  }

  public clear = (): void => {
    if (this.props.onSelect) {
      this.props.onSelect(null);
    }
  };

  // BaseDatepickerComponent

  protected getComponentTitle(): RenderProp<TextProps> | React.ReactText {
    if (this.props.date) {
      return this.props.dateService.format(this.props.date, null);
    } else {
      return this.props.placeholder;
    }
  }

  protected onSelect = (date: D): void => {
    this.props.onSelect && this.props.onSelect(date);
    this.props.autoDismiss && this.blur();
  };

  protected renderCalendar(): CalendarElement<D> {
    return (
      <Calendar
        {...this.calendarProps}
        onSelect={this.onSelect}
      />
    );
  }
}
