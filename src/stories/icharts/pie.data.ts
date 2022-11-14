import { generate } from '@bndynet/dator';
import { SERIES_NAMES } from './data';

export function gPieData(count: number): any {
  const result: any = {};
  SERIES_NAMES.slice(0, count).forEach((c: string) => {
    result[c] = generate(1, {
      value: {
        type: 'number',
        args: {
          max: 1000000,
          min: 10000,
        },
      },
    }).value;
  });
  return result;
}

export const pieData = gPieData(8);
export const pieDataSmall = gPieData(5);
export const pieDataLarge = gPieData(20);
