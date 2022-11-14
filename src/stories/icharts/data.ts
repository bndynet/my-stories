import { generate, generateMonths } from '@bndynet/dator';

export const DEFAULT_SERIES_NAME = '中国';
export const MONTHS: string[] = generateMonths(true);
export const SERIES_NAMES: string[] = generate(5, { city: { type: 'country' } }).map(
  (item: any) => item.city
);
SERIES_NAMES.unshift(DEFAULT_SERIES_NAME);
