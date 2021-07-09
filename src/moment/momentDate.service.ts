/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  DateService,
  TranslationWidth,
} from '@ui-kitten/components';
import moment, { Moment } from 'moment';

export class MomentDateService extends DateService<Moment> {

  protected localeData: {
    firstDayOfWeek: number,
    defaultFormat: string,
    months: { [key: string]: string[] },
    days: { [key: string]: string[] },
  };

  constructor(locale: string = 'en') {
    super();
    this.setLocale(locale);
  }

  public setLocale(locale: string) {
    super.setLocale(locale);
    this.setMomentLocaleData(locale);
  }

  public addDay(date: Moment, days: number): Moment {
    return this.clone(date).add({ days });
  }

  public addMonth(date: Moment, months: number): Moment {
    return this.clone(date).add({ months });
  }

  public addYear(date: Moment, years: number): Moment {
    return this.clone(date).add({ years });
  }

  public clone(date: Moment): Moment {
    return date.clone().locale(this.locale);
  }

  public compareDates(date1: Moment, date2: Moment): number {
    return this.getYear(date1) - this.getYear(date2) ||
      this.getMonth(date1) - this.getMonth(date2) ||
      this.getDate(date1) - this.getDate(date2);
  }

  public createDate(year: number, month: number, date: number): Moment {
    return moment.utc([year, month, date]);
  }

  public format(date: Moment, format: string): string {
    if (date) {
      return date.format(format || this.localeData.defaultFormat);
    }

    return '';
  }

  public getDate(date: Moment): number {
    return this.clone(date).date();
  }

  public getDayOfWeek(date: Moment): number {
    return this.clone(date).day();
  }

  public getDayOfWeekNames(style: TranslationWidth = TranslationWidth.SHORT): string[] {
    return this.localeData.days[style];
  }

  public getFirstDayOfWeek(): number {
    return this.localeData.firstDayOfWeek;
  }

  public getMonth(date: Moment): number {
    return this.clone(date).month();
  }

  public getMonthEnd(date: Moment): Moment {
    return this.clone(date).endOf('month');
  }

  public getMonthName(date: Moment, style: TranslationWidth = TranslationWidth.SHORT): string {
    const month: number = this.getMonth(date);

    return this.getMonthNameByIndex(month, style);
  }

  public getMonthNameByIndex(month: number, style: TranslationWidth = TranslationWidth.SHORT): string {
    return this.localeData.months[style][month];
  }

  public getMonthStart(date: Moment): Moment {
    return this.clone(date).startOf('month');
  }

  public getNumberOfDaysInMonth(date: Moment): number {
    return this.clone(date).daysInMonth();
  }

  public getYear(date: Moment): number {
    return this.clone(date).year();
  }

  public getYearEnd(date: Moment): Moment {
    return this.clone(date).endOf('year');
  }

  public getYearStart(date: Moment): Moment {
    return this.clone(date).startOf('year');
  }

  public isSameDay(date1: Moment, date2: Moment): boolean {
    return this.isSameMonth(date1, date2) && this.getDate(date1) === this.getDate(date2);
  }

  public isSameMonth(date1: Moment, date2: Moment): boolean {
    return this.isSameYear(date1, date2) && this.getMonth(date1) === this.getMonth(date2);
  }

  public isSameYear(date1: Moment, date2: Moment): boolean {
    return this.getYear(date1) === this.getYear(date2);
  }

  public isValidDateString(date: string, format: string): boolean {
    return moment(date, format).isValid();
  }

  public parse(date: string, format: string): Moment {
    return moment(date, format);
  }

  public today(): Moment {
    return moment();
  }

  public getId(): string {
    return 'moment';
  }

  protected setMomentLocaleData(locale: string) {
    const momentLocaleData = moment.localeData(locale);

    this.localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      defaultFormat: momentLocaleData.longDateFormat('L'),
      months: {
        [TranslationWidth.SHORT]: momentLocaleData.monthsShort(),
        [TranslationWidth.LONG]: momentLocaleData.months(),
      },
      days: {
        [TranslationWidth.SHORT]: momentLocaleData.weekdaysShort(true),
        [TranslationWidth.LONG]: momentLocaleData.weekdays(true),
      },
    };
  }
}
