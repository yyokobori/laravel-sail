/**
 * 日付ユーティリティ
 *
 * - 外部ライブラリは使用しない
 * - すべて副作用を持たない純粋関数として実装する
 * - タイムゾーンはローカル前提とする
 * 
 * - 仕様は /doc/app/frontend/utils/date.md を参照
 */

/** ロケール種別 */
export type DateLocale = 'ja' | 'en';

/** 週始まり種別 */
export type StartOfWeek = 'sun' | 'mon';

/** 年月を表す型 */
export type YearMonth = {
  year: number;
  /** 月（1〜12） */
  month: number;
};

const WEEKDAY_NAMES_JA = ['日', '月', '火', '水', '木', '金', '土'] as const;
const WEEKDAY_NAMES_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/** 月定数 */
export const MONTHS = {
    JAN: 1,
    FEB: 2,
    MAR: 3,
    APR: 4,
    MAY: 5, 
    JUN: 6,
    JUL: 7,
    AUG: 8,
    SEP: 9,
    OCT: 10,
    NOV: 11,
    DEC: 12,
} as const;

/** 曜日指定 */
export const WEEKDAYS = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
} as const;

// ─────────────────────────────────────────────
// 基本操作
// ─────────────────────────────────────────────

/**
 * 今日の日付を取得する（時刻は 00:00:00）。
 * @returns 今日の Date
 */
export function getToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * 日付の時刻部分を切り捨てた Date を返す。
 * @param date 対象日付
 * @returns 時刻なし Date
 */
export function toDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// ─────────────────────────────────────────────
// 判定
// ─────────────────────────────────────────────

/**
 * 2つの日付が同じ日かどうかを判定する。
 * @param a 日付A
 * @param b 日付B
 * @returns 同じ日であれば true
 */
export function isSameDate(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * 指定した日付が今日かどうかを判定する。
 * @param date 判定する日付
 * @returns 今日であれば true
 */
export function isToday(date: Date): boolean {
  return isSameDate(date, getToday());
}

/**
 * 指定した日付が指定した年月に属するかどうかを判定する。
 * @param date 判定する日付
 * @param year 年
 * @param month 月（1〜12）
 * @returns 同じ年月であれば true
 */
export function isSameMonth(date: Date, year: number, month: number): boolean {
  return date.getFullYear() === year && date.getMonth() === month - 1;
}

/**
 * 日付が指定範囲内かどうかを判定する（日付のみで比較）。
 * @param date 判定する日付
 * @param minDate 最小日付（省略時は制限なし）
 * @param maxDate 最大日付（省略時は制限なし）
 * @returns 範囲内であれば true
 */
export function isInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  const d = toDateOnly(date).getTime();
  if (minDate !== undefined && d < toDateOnly(minDate).getTime()) return false;
  if (maxDate !== undefined && d > toDateOnly(maxDate).getTime()) return false;
  return true;
}

// ─────────────────────────────────────────────
// フォーマット / パース
// ─────────────────────────────────────────────

/**
 * 日付を指定フォーマットの文字列に変換する。
 *
 * トークン:
 * - `YYYY` → 年（4桁）
 * - `MM`   → 月（2桁・ゼロ埋め）
 * - `DD`   → 日（2桁・ゼロ埋め）
 * - `ddd`  → 曜日（ロケール対応）
 *
 * @param date 対象日付
 * @param format フォーマット文字列（例: 'YYYY/MM/DD(ddd)'）
 * @param locale ロケール（デフォルト: 'ja'）
 * @returns フォーマット済み文字列
 */
export function formatDate(date: Date, format: string, locale: DateLocale = 'ja'): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dow = date.getDay();
  const weekdayNames = locale === 'ja' ? WEEKDAY_NAMES_JA : WEEKDAY_NAMES_EN;

  return format
    .replace('YYYY', String(year))
    .replace('MM', String(month).padStart(2, '0'))
    .replace('DD', String(day).padStart(2, '0'))
    .replace('ddd', weekdayNames[dow]);
}

/**
 * フォーマット文字列に従って文字列を Date に変換する。
 * フォーマットに含まれる `YYYY` `MM` `DD` の位置を基準にパースする。
 * @param str 日付文字列
 * @param format フォーマット文字列（例: 'YYYY/MM/DD'）
 * @returns パース成功時は Date、失敗時は null
 */
export function parseDate(str: string, format: string): Date | null {
  const yearIdx = format.indexOf('YYYY');
  const monthIdx = format.indexOf('MM');
  const dayIdx = format.indexOf('DD');

  if (yearIdx === -1 || monthIdx === -1 || dayIdx === -1) return null;

  const year = parseInt(str.substring(yearIdx, yearIdx + 4), 10);
  const month = parseInt(str.substring(monthIdx, monthIdx + 2), 10);
  const day = parseInt(str.substring(dayIdx, dayIdx + 2), 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;

  const date = new Date(year, month - 1, day);
  // ロールオーバーが起きていないか確認（例: 2/30 → 3/2 になる場合を除外）
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

// ─────────────────────────────────────────────
// カレンダー生成
// ─────────────────────────────────────────────

/**
 * カレンダーグリッド用の日付配列を生成する。
 * 指定年月を含む 6 週（42 日）分の Date を返す。
 * 前月・翌月にまたがる日付も含む。
 * @param year 年
 * @param month 月（1〜12）
 * @param startOfWeek 週始まり（デフォルト: 'sun'）
 * @returns 42 個の Date 配列
 */
export function getCalendarDates(
  year: number,
  month: number,
  startOfWeek: StartOfWeek = 'sun',
): Date[] {
  const startDow = startOfWeek === 'sun' ? 0 : 1;
  const firstDow = new Date(year, month - 1, 1).getDay();
  const offset = (firstDow - startDow + 7) % 7;

  const dates: Date[] = [];
  for (let i = 0; i < 42; i++) {
    dates.push(new Date(year, month - 1, 1 - offset + i));
  }
  return dates;
}

/**
 * 指定ロケール・週始まりに対応した曜日名ヘッダーの配列を返す（7 要素）。
 * @param locale ロケール
 * @param startOfWeek 週始まり
 * @returns 曜日名の配列
 */
export function getWeekdayHeaders(locale: DateLocale, startOfWeek: StartOfWeek): string[] {
  const names: string[] =
    locale === 'ja' ? [...WEEKDAY_NAMES_JA] : [...WEEKDAY_NAMES_EN];
  if (startOfWeek === 'mon') {
    const sun = names.shift()!;
    names.push(sun);
  }
  return names;
}

// ─────────────────────────────────────────────
// 年月ナビゲーション
// ─────────────────────────────────────────────

/**
 * 指定年月の前月を返す。
 * @param year 年
 * @param month 月（1〜12）
 * @returns 前月の YearMonth
 */
export function getPrevMonth(year: number, month: number): YearMonth {
  if (month === MONTHS.JAN) return { year: year - 1, month: MONTHS.DEC };
  return { year, month: month - 1 };
}

/**
 * 指定年月の翌月を返す。
 * @param year 年
 * @param month 月（1〜12）
 * @returns 翌月の YearMonth
 */
export function getNextMonth(year: number, month: number): YearMonth {
  if (month === MONTHS.DEC) return { year: year + 1, month: MONTHS.JAN };
  return { year, month: month + 1 };
}

// ─────────────────────────────────────────────
// スロット用リスト生成
// ─────────────────────────────────────────────

/**
 * 選択可能な年リストを返す。
 * @param minYear 最小年
 * @param maxYear 最大年
 * @returns 年の配列（昇順）
 */
export function getYearList(minYear: number, maxYear: number): number[] {
  const years: number[] = [];
  for (let y = minYear; y <= maxYear; y++) {
    years.push(y);
  }
  return years;
}

/**
 * 1〜12 の月リストを返す。
 * @returns 月の配列
 */
export function getMonthList(): number[] {
  return [
    MONTHS.JAN,
    MONTHS.FEB,
    MONTHS.MAR,
    MONTHS.APR,
    MONTHS.MAY,
    MONTHS.JUN,
    MONTHS.JUL,
    MONTHS.AUG,
    MONTHS.SEP,
    MONTHS.OCT,
    MONTHS.NOV,
    MONTHS.DEC,
  ];
}
