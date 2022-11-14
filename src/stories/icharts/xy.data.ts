import { generate, generateTimestamps } from '@bndynet/dator';
import { MONTHS, SERIES_NAMES } from './data';

export function gXYData(
  seriesCount: number,
  dataCount: number,
  increaseBySeries?: boolean,
  args?: (
    seriesIndex: number,
    itemIndex: number
  ) => { min: number; max: number }
) {
  const seriesNames = SERIES_NAMES.slice(0, seriesCount);

  const data: any[] = [];
  for (let i = 0; i < dataCount; i++) {
    data.push(
      generate(
        1,
        seriesNames.map((sm: string, idx: number) => {
          const seed = increaseBySeries ? idx : i;
          return {
            fieldName: sm,
            type: 'number',
            args:
              typeof args === 'function'
                ? args(idx, i)
                : typeof args === 'object'
                  ? args
                  : typeof increaseBySeries !== 'undefined'
                    ? {
                        min: seed * 100 + 100,
                        max: (seed + 1) * 200 + 100,
                      }
                    : {
                        min: 1000,
                        max: 10000,
                      },
          };
        }) as []
      )
    );
  }

  const xValues = generateTimestamps(data.length, 'minute');
  data.forEach(
    (item: any, idx: number) =>
      (item.xKey =
        data.length <= MONTHS.length
          ? MONTHS[idx]
          : xValues[idx])
  );

  return data;
}


export const DATA_XY_CHART = gXYData(5, 12, false);
export const DATA_XY_CHART_BY_SERIES = gXYData(5, 12, true);
export const DATA_XY_CHART_SMALL = gXYData(5, 7, true);
export const DATA_XY_CHART_TIME = gXYData(5, 1000, true);
export const DATA_XY_CHART_SPARK = gXYData(1, 12, undefined, () => ({ min: 10, max: 100 }));
