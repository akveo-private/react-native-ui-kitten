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
import { RangeDateService } from './service/rangeDate.service';
import { CalendarRange } from './type';

export interface RangeCalendarProps<D = Date> extends StyledComponentProps, BaseCalendarProps<D> {
  range?: CalendarRange<D>;
  onSelect?: (range: CalendarRange<D>) => void;
}

export type RangeCalendarElement<D = Date> = React.ReactElement<RangeCalendarProps<D>>;

/**
 * Range Calendar provides a simple way to select a date range.
 *
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {CalendarRange<D>} range - Date range which is currently selected.
 * CalendarRange `startDate?: D, endDate?: D` - Object with start and end dates for date range.
 * A range may contain only a startDate or both startDate and endDate properties meaning completeness of picked value.
 *
 * @property {(CalendarRange) => void} onSelect - Called when day cell is pressed.
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
 * @property {boolean} boundingMonth - Defines if we should render previous and next months in the current month view.
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
 * @overview-example RangeCalendarSimpleUsage
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
 */
@styled('Calendar')
export class RangeCalendar<D = Date> extends BaseCalendarComponent<RangeCalendarProps<D>, D> {

  static defaultProps: Partial<RangeCalendarProps> = {
    ...BaseCalendarComponent.defaultProps,
    range: {},
  };

  private rangeDateService: RangeDateService<D> = new RangeDateService(this.dateService);

  constructor(props: RangeCalendarProps<D>) {
    super(props);

    this.createDates = this.createDates.bind(this);
    this.selectedDate = this.selectedDate.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
    this.isDateSelected = this.isDateSelected.bind(this);
    this.shouldUpdateDate = this.shouldUpdateDate.bind(this);
  }

  // BaseCalendarComponent

  protected createDates(date: D): DateBatch<D> {
    return this.dataService.createDayPickerData(date, this.props.range);
  }

  protected selectedDate(): D {
    return this.dateService.today();
  }

  protected onDateSelect(date: D): void {
    if (this.props.onSelect) {
      const range: CalendarRange<D> = this.rangeDateService.createRange(this.props.range, date);
      this.props.onSelect(range);
    }
  }

  protected isDateSelected(date: D): boolean {
    return false;
  }

  protected shouldUpdateDate(props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>): boolean {
    const dateChanged: boolean = this.dateService.compareDatesSafe(props.date.date, nextProps.date.date) !== 0;

    if (dateChanged) {
      return true;
    }

    const selectionChanged: boolean = props.selected !== nextProps.selected;
    const disablingChanged: boolean = props.disabled !== nextProps.disabled;
    const rangeChanged: boolean = props.range !== nextProps.range;
    const rangeStartPlaceChanged: boolean = props.firstRangeItem !== nextProps.firstRangeItem;
    const rangeEndPlaceChanged: boolean = props.lastRangeItem !== nextProps.lastRangeItem;

    const shouldUpdate: boolean =
      selectionChanged
      || disablingChanged
      || rangeChanged
      || rangeStartPlaceChanged
      || rangeEndPlaceChanged;

    if (shouldUpdate) {
      return true;
    }

    return props.eva.theme !== nextProps.eva.theme;
  }
}
