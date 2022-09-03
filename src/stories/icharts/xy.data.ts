import { generate, generateMonths } from '@bndynet/dator';

const months = generateMonths(true);

export function g(
  seriesCount: number,
  dataCount: number,
  increaseBySeries?: boolean,
  args?: (
    seriesIndex: number,
    itemIndex: number
  ) => { min: number; max: number }
) {
  const seriesNames: string[] = generate(seriesCount, {
    v: {
      type: 'city',
    },
  }).map((item: { v: string }) => item.v);

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
                  : {
                      min: seed * 100 + 100,
                      max: (seed + 1) * 200 + 100,
                    },
          };
        }) as []
      )
    );
  }

  data.forEach((item: any, idx: number) => (item.xKey = 'Day ' + idx));

  return data;
}
