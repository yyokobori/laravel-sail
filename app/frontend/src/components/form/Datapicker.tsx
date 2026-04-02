import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Label } from './Label';
import { Select } from './Select';
import type {
  DatapickerProps,
  DatapickerStartOfWeek,
  DatapickerStyleClasses,
  SelectStyleClasses,
} from './types';
import {
  formatDate,
  getCalendarDates,
  getMonthList,
  getNextMonth,
  getPrevMonth,
  getToday,
  getWeekdayHeaders,
  getYearList,
  isInRange,
  isSameDate,
  isSameMonth,
  isToday,
} from '../../utils/date';

/**
 * 週末曜日のデフォルト文字色。
 */
const DEFAULT_WEEKEND_COLORS = {
  sunday: 'text-red-500',
  saturday: 'text-blue-500',
} as const;

/**
 * Datapicker のデフォルトスタイルクラス。
 */
const DEFAULT_STYLE_CLASSES: DatapickerStyleClasses = {
  container: 'relative block',
  input:
    'block w-full bg-template-white border-2 border-template-gray-400 rounded-lg pr-12 pl-4 py-2.5 text-template-gray-900 placeholder-template-gray-400 focus:outline-none focus:border-template-gray-500 transition-colors',
  icon: 'absolute right-3 top-1/2 -translate-y-1/2 text-template-gray-500',
  calendar:
    'absolute z-30 mt-2 w-[22rem] rounded-lg border-2 border-template-gray-300 bg-white p-4 shadow-lg',
  header: 'relative z-40 mb-3 flex items-center justify-between gap-2',
  day: 'h-9 w-9 rounded-full text-sm transition-colors',
  selectedDay: 'bg-red-100 text-template-gray-900 rounded-md font-semibold',
  today: 'bg-red-100 text-template-gray-900 rounded-full font-semibold',
  footer: 'mt-3 grid grid-cols-3 items-center text-sm font-semibold',
};

/**
 * ヘッダー年/月 Select 用スタイル。
 * 外枠は非表示にして文字幅に合わせる。
 */
const HEADER_SELECT_STYLES: SelectStyleClasses = {
  container: 'block',
  selectWrapper: 'relative inline-block',
  select:
    'w-auto min-w-0 border-0 rounded-md px-2 py-1.5 text-base font-semibold shadow-none',
  arrow: 'ml-2 text-template-gray-500',
};

/**
 * Datepicker を描画する。
 * @param props 日付選択に必要な設定
 * @returns Datepicker コンポーネント
 */
export function Datapicker(props: DatapickerProps): JSX.Element {
  const {
    name,
    value,
    onChange,
    label,
    locale = 'ja',
    startOfWeek = 'sun',
    weekendColors,
    format = 'YYYY/MM/DD(ddd)',
    placeholder = 'YYYY/MM/DD',
    minDate,
    maxDate,
    styleClasses,
  } = props;

  const mergedStyle: DatapickerStyleClasses = {
    ...DEFAULT_STYLE_CLASSES,
    ...styleClasses,
  };
  const colors = {
    sunday: weekendColors?.sunday ?? DEFAULT_WEEKEND_COLORS.sunday,
    saturday: weekendColors?.saturday ?? DEFAULT_WEEKEND_COLORS.saturday,
  };

  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialBase = value ?? getToday();
  const [currentYear, setCurrentYear] = useState<number>(initialBase.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(initialBase.getMonth() + 1);

  const weekdays = useMemo(() => getWeekdayHeaders(locale, startOfWeek), [locale, startOfWeek]);
  const calendarDates = useMemo(
    () => getCalendarDates(currentYear, currentMonth, startOfWeek),
    [currentYear, currentMonth, startOfWeek],
  );

  const minYear = minDate?.getFullYear() ?? currentYear - 100;
  const maxYear = maxDate?.getFullYear() ?? currentYear + 100;
  const yearList = useMemo(() => getYearList(minYear, maxYear), [minYear, maxYear]);
  const monthList = useMemo(() => getMonthList(), []);
  const yearOptions = useMemo(
    () => yearList.map((year) => ({ value: String(year), label: `${year} 年` })),
    [yearList],
  );
  const monthOptions = useMemo(
    () =>
      monthList.map((month) => ({
        value: String(month),
        label: `${String(month).padStart(2, '0')} 月`,
      })),
    [monthList],
  );

  useEffect(() => {
    const base = value ?? getToday();
    setCurrentYear(base.getFullYear());
    setCurrentMonth(base.getMonth() + 1);
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;

    /**
     * カレンダー外クリックでポップアップを閉じる。
     * @param event マウスイベント
     */
    function handleOutsideClick(event: MouseEvent): void {
      if (rootRef.current === null) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  /**
   * カレンダー表示をトグルする。
   */
  function toggleCalendar(): void {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen && value === null) {
      const today = getToday();
      setCurrentYear(today.getFullYear());
      setCurrentMonth(today.getMonth() + 1);
    }
  }

  /**
   * 日付を確定してカレンダーを閉じる。
   * @param date 選択された日付
   */
  function selectDate(date: Date): void {
    if (!isInRange(date, minDate, maxDate)) return;
    onChange(date);
    setIsOpen(false);
  }

  /**
   * 表示月を前月に移動する。
   */
  function movePrevMonth(): void {
    const prev = getPrevMonth(currentYear, currentMonth);
    setCurrentYear(prev.year);
    setCurrentMonth(prev.month);
  }

  /**
   * 表示月を翌月に移動する。
   */
  function moveNextMonth(): void {
    const next = getNextMonth(currentYear, currentMonth);
    setCurrentYear(next.year);
    setCurrentMonth(next.month);
  }

  /**
   * 年の Select 変更時に表示年を更新する。
   * @param selectedYear 選択値（文字列）
   */
  function handleYearSelect(selectedYear: string): void {
    const parsedYear = parseInt(selectedYear, 10);
    if (!isNaN(parsedYear)) {
      setCurrentYear(parsedYear);
    }
  }

  /**
   * 月の Select 変更時に表示月を更新する。
   * @param selectedMonth 選択値（文字列）
   */
  function handleMonthSelect(selectedMonth: string): void {
    const parsedMonth = parseInt(selectedMonth, 10);
    if (!isNaN(parsedMonth)) {
      setCurrentMonth(parsedMonth);
    }
  }

  /**
   * 日付選択を解除してカレンダーを閉じる。
   */
  function resetDate(): void {
    onChange(null);
    setIsOpen(false);
  }

  /**
   * 今日の日付を選択してカレンダーを閉じる。
   */
  function selectToday(): void {
    const today = getToday();
    if (!isInRange(today, minDate, maxDate)) return;
    onChange(today);
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setIsOpen(false);
  }

  /**
   * 曜日ヘッダーの色クラスを返す。
   * @param index 曜日インデックス
   * @param weekStart 週始まり設定
   * @returns 曜日表示クラス
   */
  function getWeekdayClass(index: number, weekStart: DatapickerStartOfWeek): string {
    const isSun = (weekStart === 'sun' && index === 0) || (weekStart === 'mon' && index === 6);
    const isSat = (weekStart === 'sun' && index === 6) || (weekStart === 'mon' && index === 5);

    if (isSun) return colors.sunday;
    if (isSat) return colors.saturday;
    return 'text-template-gray-900';
  }

  const displayValue = value === null ? '' : formatDate(value, format, locale);

  return (
    <div className={mergedStyle.container} ref={rootRef}>
      {label !== undefined ? <Label htmlFor={name} text={label} /> : null}

      <div className="relative">
        <input
          id={name}
          name={name}
          value={displayValue}
          readOnly
          placeholder={placeholder}
          onClick={toggleCalendar}
          className={mergedStyle.input}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={`${name}-calendar`}
        />

        <button
          type="button"
          onClick={toggleCalendar}
          className={mergedStyle.icon}
          aria-label="カレンダーを開く"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div id={`${name}-calendar`} role="dialog" aria-label="日付選択" className={mergedStyle.calendar}>
          <div className={mergedStyle.header}>
            <button type="button" onClick={movePrevMonth} className="rounded-md px-2 py-1 hover:bg-template-gray-100">
              <span aria-hidden="true">&lt;</span>
            </button>

            <div className="flex items-center gap-2 text-base font-semibold">
              <Select
                name={`${name}-year`}
                value={String(currentYear)}
                options={yearOptions}
                enableOptionIndent={false}
                onValueChange={(selected) => {
                  if (typeof selected === 'string') {
                    handleYearSelect(selected);
                  }
                }}
                styleClasses={HEADER_SELECT_STYLES}
              />
              <Select
                name={`${name}-month`}
                value={String(currentMonth)}
                options={monthOptions}
                enableOptionIndent={false}
                onValueChange={(selected) => {
                  if (typeof selected === 'string') {
                    handleMonthSelect(selected);
                  }
                }}
                styleClasses={HEADER_SELECT_STYLES}
              />
            </div>

            <button type="button" onClick={moveNextMonth} className="rounded-md px-2 py-1 hover:bg-template-gray-100">
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm font-bold">
            {weekdays.map((weekday, index) => (
              <span key={weekday} className={getWeekdayClass(index, startOfWeek)}>
                {weekday}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDates.map((date) => {
              const inCurrentMonth = isSameMonth(date, currentYear, currentMonth);
              const isSelected = value !== null && isSameDate(date, value);
              const isCurrentDay = isToday(date);
              const disabled = !isInRange(date, minDate, maxDate);
              const todayClass = !isSelected && isCurrentDay ? mergedStyle.today ?? '' : '';
              const buttonClass = `${mergedStyle.day} ${
                inCurrentMonth ? 'text-template-gray-900' : 'text-template-gray-400'
              } ${todayClass} ${isSelected ? mergedStyle.selectedDay ?? '' : ''} ${
                disabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-sky-100'
              }`;

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => selectDate(date)}
                  disabled={disabled}
                  className={buttonClass}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className={mergedStyle.footer}>
            <span />
            <button
              type="button"
              onClick={resetDate}
              className="justify-self-center underline underline-offset-2 hover:text-template-gray-700"
            >
              リセット
            </button>
            <button
              type="button"
              onClick={selectToday}
              className="justify-self-end underline underline-offset-2 hover:text-template-gray-700"
            >
              今日
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
