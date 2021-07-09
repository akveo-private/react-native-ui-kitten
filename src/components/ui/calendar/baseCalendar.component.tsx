/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  EvaProp,
  StyleType,
} from '../../theme';
import { Divider } from '../divider/divider.component';
import {
  CalendarHeader,
  CalendarHeaderElement,
} from './components/calendarHeader.component';
import { CalendarMonthHeader } from './components/calendarMonthHeader.component';
import {
  CalendarPicker,
  CalendarPickerElement,
} from './components/picker/calendarPicker.component';
import { CalendarPickerCellProps } from './components/picker/calendarPickerCell.component';
import {
  CalendarDateContent,
  CalendarDateContentElement,
} from './components/calendarDateContent.component';
import {
  CalendarDateInfo,
  CalendarViewMode,
  CalendarViewModes,
  CalendarViewModeId,
} from './type';
import { TranslationWidth } from './i18n/type';
import { DateService } from './service/date.service';
import { NativeDateService } from './service/nativeDate.service';
import {
  CalendarDataService,
  DateBatch,
} from './service/calendarData.service';

export interface BaseCalendarProps<D = Date> extends ViewProps {
  min?: D;
  max?: D;
  dateService?: DateService<D>;
  boundingMonth?: boolean;
  startView?: CalendarViewMode;
  title?: (date: D, viewMode: CalendarViewMode) => string;
  filter?: (date: D) => boolean;
  renderFooter?: () => React.ReactElement;
  renderDay?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  renderMonth?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  renderYear?: (info: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  renderArrowLeft?: (viewModeId: CalendarViewModeId) => React.ReactElement;
  renderArrowRight?: (viewModeId: CalendarViewModeId) => React.ReactElement;
  onVisibleDateChange?: (date: D, viewModeId: CalendarViewModeId) => void;
  eva?: EvaProp;
}

export type BaseCalendarElement<D> = React.ReactElement<BaseCalendarProps<D>>;

interface State<D> {
  viewMode: CalendarViewMode;
  visibleDate: D;
}

const PICKER_ROWS: number = 4;
const PICKER_COLUMNS: number = 3;
const VIEWS_IN_PICKER: number = PICKER_ROWS * PICKER_COLUMNS;

export abstract class BaseCalendarComponent<P, D = Date> extends React.Component<BaseCalendarProps<D> & P, State<D>> {

  static defaultProps: Partial<BaseCalendarProps> = {
    dateService: new NativeDateService(),
    boundingMonth: true,
    startView: CalendarViewModes.DATE,
  };

  public state: State<D> = {
    viewMode: this.props.startView,
    visibleDate: this.dateService.getMonthStart(this.selectedDate()),
  };
  protected dataService: CalendarDataService<D> = new CalendarDataService(this.dateService);

  protected get dateService(): DateService<D> {
    return this.props.dateService;
  }

  private get min(): D {
    return this.props.min || this.dateService.getYearStart(this.dateService.today());
  }

  private get max(): D {
    return this.props.max || this.dateService.getYearEnd(this.dateService.today());
  }

  public scrollToToday = (): void => {
    this.setState({
      viewMode: CalendarViewModes.DATE,
      visibleDate: this.dateService.today(),
    });
  };

  public getCalendarStyle = (source: StyleType) => {
    return {
      container: {
        width: source.width,
        paddingVertical: source.paddingVertical,
        borderColor: source.borderColor,
        borderWidth: source.borderWidth,
        borderRadius: source.borderRadius,
      },
      headerContainer: {
        paddingHorizontal: source.headerPaddingHorizontal,
        paddingVertical: source.headerPaddingVertical,
      },
      title: {
        fontSize: source.titleFontSize,
        fontWeight: source.titleFontWeight,
        color: source.titleColor,
        fontFamily: source.titleFontFamily,
      },
      icon: {
        width: source.iconWidth,
        height: source.iconHeight,
        tintColor: source.iconTintColor,
      },
      divider: {
        marginVertical: source.dividerMarginVertical,
      },
      daysHeaderContainer: {
        marginHorizontal: source.rowMarginHorizontal,
      },
      row: {
        minHeight: source.rowMinHeight,
        marginHorizontal: source.rowMarginHorizontal,
      },
    };
  };

  public isDayDisabled = ({ date }: CalendarDateInfo<D>): boolean => {
    const minDayStart: D = this.dateService.createDate(
      this.dateService.getYear(this.min),
      this.dateService.getMonth(this.min),
      this.dateService.getDate(this.min),
    );

    const maxDayStart: D = this.dateService.createDate(
      this.dateService.getYear(this.max),
      this.dateService.getMonth(this.max),
      this.dateService.getDate(this.max),
    );

    const fitsFilter: boolean = this.props.filter && !this.props.filter(date) || false;

    return !this.dateService.isBetweenIncludingSafe(date, minDayStart, maxDayStart) || fitsFilter;
  };

  public isDayToday = ({ date }: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameDaySafe(date, this.dateService.today());
  };

  protected abstract createDates(date: D): DateBatch<D>;

  protected abstract selectedDate(): D;

  protected abstract onDateSelect(item: D): void;

  protected abstract isDateSelected(date: D): boolean;

  protected abstract shouldUpdateDate(props: CalendarPickerCellProps<D>,
                                      nextProps: CalendarPickerCellProps<D>): boolean;

  private onDaySelect = ({ date }: CalendarDateInfo<D>): void => {
    this.onDateSelect(date);
  };

  private onMonthSelect = ({ date }: CalendarDateInfo<D>): void => {
    const nextVisibleDate: D = this.dateService.createDate(
      this.dateService.getYear(this.state.visibleDate),
      this.dateService.getMonth(date),
      this.dateService.getDate(this.state.visibleDate),
    );

    this.setState({
      viewMode: this.state.viewMode.pickNext(),
      visibleDate: nextVisibleDate,
    }, () => {
      this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
    });
  };

  private onYearSelect = ({ date }: CalendarDateInfo<D>): void => {
    const nextVisibleDate: D = this.dateService.createDate(
      this.dateService.getYear(date),
      this.dateService.getMonth(this.state.visibleDate),
      this.dateService.getDate(this.state.visibleDate),
    );

    this.setState({
      viewMode: this.state.viewMode.pickNext(),
      visibleDate: nextVisibleDate,
    }, () => {
      this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
    });
  };

  private onPickerNavigationPress = (): void => {
    this.setState({
      viewMode: this.state.viewMode.navigationNext(),
    });
  };

  private onHeaderNavigationLeftPress = (): void => {
    this.setState({
      visibleDate: this.createViewModeVisibleDate(-1),
    }, () => {
      this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
    });
  };

  private onHeaderNavigationRightPress = (): void => {
    this.setState({
      visibleDate: this.createViewModeVisibleDate(1),
    }, () => {
      this.props.onVisibleDateChange?.(this.state.visibleDate, this.state.viewMode.id);
    });
  };

  private getWeekdayStyle = (source: StyleType): StyleType => {
    return {
      fontSize: source.weekdayTextFontSize,
      fontWeight: source.weekdayTextFontWeight,
      color: source.weekdayTextColor,
      fontFamily: source.weekdayTextFontFamily,
    };
  };

  private isDaySelected = ({ date }: CalendarDateInfo<D>): boolean => {
    return this.isDateSelected(date);
  };

  private isMonthSelected = ({ date }: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameMonthSafe(date, this.selectedDate());
  };

  private isYearSelected = ({ date }: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameYearSafe(date, this.selectedDate());
  };

  private isMonthDisabled = ({ date }: CalendarDateInfo<D>): boolean => {
    const minMonthStart: D = this.dateService.getMonthStart(this.min);
    const maxMonthStart: D = this.dateService.getMonthStart(this.max);

    return !this.dateService.isBetweenIncludingSafe(date, minMonthStart, maxMonthStart);
  };

  private isYearDisabled = ({ date }: CalendarDateInfo<D>): boolean => {
    const minYearStart: D = this.dateService.getYearStart(this.min);
    const maxYearStart: D = this.dateService.getYearEnd(this.max);

    return !this.dateService.isBetweenIncludingSafe(date, minYearStart, maxYearStart);
  };

  private isMonthToday = (date: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameMonthSafe(date.date, this.dateService.today());
  };

  private isYearToday = ({ date }: CalendarDateInfo<D>): boolean => {
    return this.dateService.isSameYearSafe(date, this.dateService.today());
  };

  private isHeaderNavigationAllowed = (): boolean => {
    return this.state.viewMode.id !== CalendarViewModes.MONTH.id;
  };

  private createViewModeVisibleDate = (page: number): D => {
    switch (this.state.viewMode.id) {
      case CalendarViewModes.DATE.id: {
        return this.dateService.addMonth(this.state.visibleDate, page);
      }
      case CalendarViewModes.MONTH.id: {
        return this.dateService.addYear(this.state.visibleDate, page);
      }
      case CalendarViewModes.YEAR.id: {
        return this.dateService.addYear(this.state.visibleDate, VIEWS_IN_PICKER * page);
      }
    }
  };

  private createViewModeHeaderTitle = (date: D, viewMode: CalendarViewMode): string => {
    switch (viewMode.id) {
      case CalendarViewModes.DATE.id: {
        const month: string = this.props.dateService.getMonthName(date, TranslationWidth.LONG);
        const year: number = this.props.dateService.getYear(date);
        return `${month} ${year}`;
      }
      case CalendarViewModes.MONTH.id: {
        return `${this.dateService.getYear(date)}`;
      }
      case CalendarViewModes.YEAR.id: {
        const minDateFormat: number = this.dateService.getYear(this.min);
        const maxDateFormat: number = this.dateService.getYear(this.max);

        return `${minDateFormat} - ${maxDateFormat}`;
      }
    }
  };

  private renderDayIfNeeded = (item: CalendarDateInfo<D>, style: StyleType): CalendarDateContentElement => {
    const shouldRender: boolean = !item.bounding || this.props.boundingMonth;

    if (shouldRender) {
      const renderSelector = this.props.renderDay || this.renderDayElement;
      return renderSelector(item, style);
    }

    return null;
  };

  private renderWeekdayElement = (weekday: string, index: number): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        key={index}
        textStyle={this.getWeekdayStyle(this.props.eva.style)}>
        {weekday}
      </CalendarDateContent>
    );
  };

  private renderDayElement = ({ date }: CalendarDateInfo<D>, evaStyle): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={evaStyle.container}
        textStyle={evaStyle.text}>
        {this.dateService.getDate(date)}
      </CalendarDateContent>
    );
  };

  private renderMonthElement = ({ date }: CalendarDateInfo<D>, evaStyle): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={evaStyle.container}
        textStyle={evaStyle.text}>
        {this.dateService.getMonthName(date, TranslationWidth.SHORT)}
      </CalendarDateContent>
    );
  };

  private renderYearElement = ({ date }: CalendarDateInfo<D>, evaStyle): CalendarDateContentElement => {
    return (
      <CalendarDateContent
        style={evaStyle.container}
        textStyle={evaStyle.text}>
        {this.dateService.getYear(date)}
      </CalendarDateContent>
    );
  };

  private renderDayPickerElement = (date: D, evaStyle): React.ReactFragment => {
    return (
      <React.Fragment>
        <CalendarMonthHeader
          style={evaStyle.daysHeaderContainer}
          data={this.dateService.getDayOfWeekNames()}>
          {this.renderWeekdayElement}
        </CalendarMonthHeader>
        <Divider style={evaStyle.divider}/>
        <CalendarPicker
          rowStyle={evaStyle.row}
          data={this.createDates(date)}
          onSelect={this.onDaySelect}
          isItemSelected={this.isDaySelected}
          isItemDisabled={this.isDayDisabled}
          isItemToday={this.isDayToday}
          shouldItemUpdate={this.shouldUpdateDate}>
          {this.renderDayIfNeeded}
        </CalendarPicker>
      </React.Fragment>
    );
  };

  private renderMonthPickerElement = (date: D, evaStyle): CalendarPickerElement<D> => {
    return (
      <CalendarPicker
        rowStyle={evaStyle.row}
        data={this.dataService.createMonthPickerData(date, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={this.onMonthSelect}
        isItemSelected={this.isMonthSelected}
        isItemDisabled={this.isMonthDisabled}
        isItemToday={this.isMonthToday}>
        {this.props.renderMonth || this.renderMonthElement}
      </CalendarPicker>
    );
  };

  private renderYearPickerElement = (date: D, style: StyleType): CalendarPickerElement<D> => {
    return (
      <CalendarPicker
        rowStyle={style.row}
        data={this.dataService.createYearPickerData(date, PICKER_ROWS, PICKER_COLUMNS)}
        onSelect={this.onYearSelect}
        isItemSelected={this.isYearSelected}
        isItemDisabled={this.isYearDisabled}
        isItemToday={this.isYearToday}>
        {this.props.renderYear || this.renderYearElement}
      </CalendarPicker>
    );
  };

  private renderPickerElement = (date: D, style: StyleType): React.ReactNode => {
    switch (this.state.viewMode.id) {
      case CalendarViewModes.DATE.id:
        return this.renderDayPickerElement(date, style);
      case CalendarViewModes.MONTH.id:
        return this.renderMonthPickerElement(date, style);
      case CalendarViewModes.YEAR.id:
        return this.renderYearPickerElement(date, style);
    }
  };

  private renderFooterElement = (evaStyle): React.ReactElement => {
    if (this.props.renderFooter) {
      return this.props.renderFooter();
    }
    return null;
  };

  private renderArrowLeft = () => {
    return this.props.renderArrowLeft(this.state.viewMode.id);
  }

  private renderArrowRight = () => {
    return this.props.renderArrowRight(this.state.viewMode.id);
  }

  private renderHeaderElement = (evaStyle): CalendarHeaderElement => {
    const titleSelector = this.props.title || this.createViewModeHeaderTitle;

    return (
      <CalendarHeader
        style={evaStyle.headerContainer}
        title={titleSelector(this.state.visibleDate, this.state.viewMode)}
        titleStyle={evaStyle.title}
        iconStyle={evaStyle.icon}
        lateralNavigationAllowed={this.isHeaderNavigationAllowed()}
        onTitlePress={this.onPickerNavigationPress}
        onNavigationLeftPress={this.onHeaderNavigationLeftPress}
        onNavigationRightPress={this.onHeaderNavigationRightPress}
        arrowLeft={this.props.renderArrowLeft && this.renderArrowLeft}
        arrowRight={this.props.renderArrowRight && this.renderArrowRight}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, ...viewProps } = this.props;
    const evaStyle = this.getCalendarStyle(eva.style);

    return (
      <View
        {...viewProps}
        style={[evaStyle.container, style]}>
        {this.renderHeaderElement(evaStyle)}
        {this.renderPickerElement(this.state.visibleDate, evaStyle)}
        {this.renderFooterElement(evaStyle)}
      </View>
    );
  }
}
