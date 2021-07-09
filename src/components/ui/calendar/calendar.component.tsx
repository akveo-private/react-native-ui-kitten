/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  styled,
  StyledComponentProps,
} from '../../theme';
import {
  BaseCalendarComponent,
  BaseCalendarProps,
} from './baseCalendar.component';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import { DateBatch } from './service/calendarData.service';

export interface CalendarProps<D = Date> extends StyledComponentProps, BaseCalendarProps<D> {
  date?: D;
  onSelect?: (date: D) => void;
}

export type CalendarElement<D = Date> = React.ReactElement<CalendarProps<D>>;

/**
 * Calendar provides a simple way to select a date.
 *
 * @extends React.Component
 *
 * @property {D} date - Date which is currently selected.
 * Defaults to current date.
 *
 * @property {(D) => void} onSelect - Called when date cell is pressed.
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
 * @property {boolean} boundingMonth - Whether previous and next months in the current month view should be rendered.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar.
 * Can be `CalendarViewModes.DATE`, `CalendarViewModes.MONTH` or `CalendarViewModes.YEAR`.
 * Defaults to *CalendarViewModes.DATE*.
 *
 * @property {(D) => string} title - A function to transform selected date to a string displayed in header.
 *
 * @property {(D) => boolean} filter - A function to determine whether particular date cells should be disabled.
 *
 * @property {() => ReactElement} renderFooter - Function component
 * to render below the calendar.
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
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example CalendarSimpleUsage
 *
 * @overview-example RangeCalendarSimpleUsage
 * There is an alternative calendar component, to work with date ranges.
 *
 * @overview-example RangeCalendarType
 * Ranged calendar works with special range object - CalendarRange.
 * For empty ranges, range has no date properties.
 * And for incomplete ranges, there is only a `startDate` property.
 * ```
 * export interface CalendarRange<D> {
 *   startDate?: D;
 *   endDate?: D;
 * }
 * ```
 *
 * @overview-example CalendarFilters
 * Calendar may accept minimal and maximum dates, filter functions, and `boundingMonth` property,
 * which disables displaying previous month dates at the current date view.
 *
 * @overview-example CalendarLocaleSettings
 * Also, it is possible to setup locale by configuring Date Service.
 *
 * @overview-example CalendarMoment
 * Calendar is able to work with Moment, by configuring date service.
 * In order to use Moment, `@ui-kitten/moment` package is required.
 *
 * @overview-example CalendarCustomDay
 * To render custom cells, `renderDay`, `renderMonth` and `renderYear` properties may be used.
 *
 * @overview-example CalendarTheming
 * Styling of the calendar is possible with [configuring a custom theme](guides/branding).
 */

@styled('Calendar')
export class Calendar<D = Date> extends BaseCalendarComponent<CalendarProps<D>, D> {

  constructor(props: CalendarProps<D>) {
    super(props);

    this.createDates = this.createDates.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shouldUpdateDate = this.shouldUpdateDate.bind(this);
  }

  // BaseCalendarComponent

  protected createDates(date: D): DateBatch<D> {
    return this.dataService.createDayPickerData(date);
  }

  protected selectedDate(): D {
    return this.props.date || this.dateService.today();
  }

  protected onDateSelect(date: D): void {
    this.props.onSelect && this.props.onSelect(date);
  }

  protected isDateSelected(date: D): boolean {
    return this.dateService.isSameDaySafe(date, this.selectedDate());
  }

  protected shouldUpdateDate(props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>): boolean {
    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;

    const value: boolean = selectionChanged || disablingChanged;

    if (value) {
      return true;
    }

    return props.eva.theme !== nextProps.eva.theme;
  }
}
