import { generate } from '@bndynet/dator';

const countries: string[] = generate(20, {
  country: {
    type: 'country',
  },
}).map((item: { country: string }) => item.country);

function gD(count: number): any {
  const result: any = {};
  countries.slice(0, count).forEach((c: string) => {
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

export const pieData = gD(8);
export const pieDataSmall = gD(5);
export const pieDataLarge = gD(20);
