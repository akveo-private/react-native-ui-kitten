/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DateService } from './date.service';
import {
  batch,
  range,
} from './helpers';
import {
  CalendarDateInfo,
  CalendarDateOptions,
  CalendarRange,
} from '../type';

const DEFAULT_DATE_OPTIONS: CalendarDateOptions = {
  bounding: false,
  holiday: false,
  range: false,
};

type DateRange<D> = CalendarDateInfo<D>[];
type DateBatch<D> = DateRange<D>[];

export class CalendarDataService<D> {

  constructor(protected dateService: DateService<D>) {
  }

  public createDayPickerData = (date: D, calendarRange?: CalendarRange<D>): DateBatch<D> => {
    const weeks: DateBatch<D> = this.createDates(date, DEFAULT_DATE_OPTIONS, calendarRange);

    return this.withBoundingMonths(weeks, date);
  };

  public createMonthPickerData = (date: D, rows: number, columns: number): DateBatch<D> => {
    const yearStart: D = this.dateService.getYearStart(date);
    const monthRange: DateRange<D> = range(rows * columns, (index: number): CalendarDateInfo<D> => {
      const monthDate: D = this.dateService.addMonth(yearStart, index);
      return { date: monthDate, ...DEFAULT_DATE_OPTIONS };
    });

    return batch(monthRange, rows);
  };

  public createYearPickerData = (date: D, rows: number, columns: number): DateBatch<D> => {
    const yearStart: D = this.dateService.getYearStart(date);
    const yearRange: DateRange<D> = range(rows * columns, (index: number): CalendarDateInfo<D> => {
      const yearDate: D = this.dateService.addYear(yearStart, index);
      return { date: yearDate, ...DEFAULT_DATE_OPTIONS };
    });

    return batch(yearRange, rows);
  };

  public createDayPickerPagerData = (startDate: D, endDate: D): DateRange<D> => {
    const numberOfDayPickers: number = this.getNumberOfMonths(startDate, endDate) + 1;

    return range(numberOfDayPickers, (index: number): CalendarDateInfo<D> => {
      const monthDate: D = this.dateService.addMonth(startDate, index);
      return { date: monthDate, ...DEFAULT_DATE_OPTIONS };
    });
  };

  public createYearPickerPagerData = (startDate: D, endDate: D, rows: number, columns: number): DateRange<D> => {
    const numberOfYears: number = this.getNumberOfYears(startDate, endDate) + 1;
    const numberOfYearPickers: number = Math.max(Math.ceil(numberOfYears / (rows * columns)), 1);

    return range(numberOfYearPickers, (index: number): CalendarDateInfo<D> => {
      const yearDate: D = this.dateService.addYear(startDate, index * rows * columns);
      return { date: yearDate, ...DEFAULT_DATE_OPTIONS };
    });
  };

  public getNumberOfMonths = (lhs: D, rhs: D): number => {
    const numberOfYears: number = this.getNumberOfYears(lhs, rhs);
    const numberOfMonths: number = this.dateService.getMonth(rhs) - this.dateService.getMonth(lhs);

    return numberOfMonths + numberOfYears * DateService.MONTHS_IN_YEAR;
  };

  public getNumberOfYears = (lhs: D, rhs: D): number => {
    return this.dateService.getYear(rhs) - this.dateService.getYear(lhs);
  };

  private createDates(activeMonth: D, options: CalendarDateOptions, calendarRange: CalendarRange<D>): DateBatch<D> {
    const days: DateRange<D> = this.createDateRangeForMonth(activeMonth, options);
    const patchedDays: DateRange<D> = this.patchRangeDates(days, calendarRange);
    const startOfWeekDayDiff: number = this.getStartOfWeekDayDiff(activeMonth);

    return batch(patchedDays, DateService.DAYS_IN_WEEK, startOfWeekDayDiff);
  }

  private patchRangeDates(days: DateRange<D>, calendarRange: CalendarRange<D>): DateRange<D> {
    if (calendarRange.startDate && !calendarRange.endDate) {
      days.map((day: CalendarDateInfo<D>) => {
        if (this.dateService.compareDatesSafe(day.date, calendarRange.startDate) === 0) {
          day.range = true;
          return day;
        }
      });

      return days;
    }

    if (calendarRange.startDate && calendarRange.endDate) {
      return days.map((day: CalendarDateInfo<D>) => {
        if (this.dateService.compareDatesSafe(day.date, calendarRange.startDate) === 0 ||
          this.dateService.compareDatesSafe(day.date, calendarRange.endDate) === 0) {

          day.range = true;
          return day;
        } else {
          const isInRange: boolean = this.dateService
            .isBetween(day.date, calendarRange.startDate, calendarRange.endDate);
          return { ...day, range: isInRange };
        }
      });
    } else {
      return days;
    }
  }

  private withBoundingMonths(weeks: DateBatch<D>, activeMonth: D): DateBatch<D> {
    let withBoundingMonths: DateBatch<D> = weeks;

    if (this.isShouldAddPrevBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addPrevBoundingMonth(withBoundingMonths, activeMonth);
    }

    if (this.isShouldAddNextBoundingMonth(withBoundingMonths)) {
      withBoundingMonths = this.addNextBoundingMonth(withBoundingMonths, activeMonth);
    }

    return withBoundingMonths;
  }

  private addPrevBoundingMonth(weeks: DateBatch<D>, activeMonth: D): DateBatch<D> {
    const firstWeek: DateRange<D> = weeks.shift();
    const numberOfBoundingDates: number = DateService.DAYS_IN_WEEK - firstWeek.length;
    firstWeek.unshift(...this.createPrevBoundingDays(activeMonth, numberOfBoundingDates));

    return [firstWeek, ...weeks];
  }

  private addNextBoundingMonth(weeks: DateBatch<D>, activeMonth: D): DateBatch<D> {
    const lastWeek: DateRange<D> = weeks.pop();
    const numberOfBoundingDates: number = DateService.DAYS_IN_WEEK - lastWeek.length;
    lastWeek.push(...this.createNextBoundingDays(activeMonth, numberOfBoundingDates));

    return [...weeks, lastWeek];
  }

  private createPrevBoundingDays(activeMonth: D, numberOfBoundingDates: number): DateRange<D> {
    const month: D = this.dateService.addMonth(activeMonth, -1);
    const daysInMonth: number = this.dateService.getNumberOfDaysInMonth(month);

    return this.createDateRangeForMonth(month, DEFAULT_DATE_OPTIONS)
      .slice(daysInMonth - numberOfBoundingDates)
      .map((date: CalendarDateInfo<D>): CalendarDateInfo<D> => {
        return { ...date, bounding: true };
      });
  }

  private createNextBoundingDays(activeMonth: D, numberOfBoundingDates: number): DateRange<D> {
    const month: D = this.dateService.addMonth(activeMonth, 1);

    return this.createDateRangeForMonth(month, DEFAULT_DATE_OPTIONS)
      .slice(0, numberOfBoundingDates)
      .map((date: CalendarDateInfo<D>): CalendarDateInfo<D> => {
        return { ...date, bounding: true };
      });
  }

  private getStartOfWeekDayDiff(date: D): number {
    const startOfMonth: D = this.dateService.getMonthStart(date);

    return this.getWeekStartDiff(startOfMonth);
  }

  private getWeekStartDiff(date: D): number {
    return (
      DateService.DAYS_IN_WEEK
      - this.dateService.getFirstDayOfWeek()
      + this.dateService.getDayOfWeek(date)
    ) % DateService.DAYS_IN_WEEK;
  }

  private isShouldAddPrevBoundingMonth(weeks: DateBatch<D>): boolean {
    return weeks[0].length < DateService.DAYS_IN_WEEK;
  }

  private isShouldAddNextBoundingMonth(weeks: DateBatch<D>): boolean {
    return weeks[weeks.length - 1].length < DateService.DAYS_IN_WEEK;
  }

  private createDateRangeForMonth(monthDate: D, options: CalendarDateOptions): DateRange<D> {
    const daysInMonth: number = this.dateService.getNumberOfDaysInMonth(monthDate);

    return range(daysInMonth, (i: number): CalendarDateInfo<D> => {
      const year: number = this.dateService.getYear(monthDate);
      const month: number = this.dateService.getMonth(monthDate);
      const date: D = this.dateService.createDate(year, month, i + 1);

      return { date, ...options };
    });
  }
}
