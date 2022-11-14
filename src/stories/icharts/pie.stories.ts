import { fn } from '@storybook/test';
import {
  PieChartOptions,
  PieVariant,
  Position,
  LegendItemContext,
  Icon,
  PieChartData,
} from '@bndynet/icharts';
import { pieData, pieDataLarge, pieDataSmall } from './pie.data';
import { createStory, meta, StoryInputs } from './utils';

export default {
  ...meta,
  title: 'My Stories/icharts/Pie',
  args: {
    type: 'pie',
  },
};

function cs(args: StoryInputs<PieChartData, PieChartOptions>) {
  return createStory<PieChartData, PieChartOptions>(args);
}

export const Default = cs({
  data: pieData,
});

export const Donut = cs({
  data: pieData,
  options: {
    variant: PieVariant.Doughnut,
    label: {
      highlight: true,
    },
  },
});

export const Half = cs({
  data: pieData,
  options: {
    variant: PieVariant.HalfDonut,
  },
});

export const NightingaleRose = cs({
  data: pieData,
  options: {
    variant: PieVariant.NightingaleRose,
  },
});

export const Nest = cs({
  options: {
    series: [{ name: '2020' }, { name: '2021' }],
  },
  data: [pieData, pieDataSmall],
});

export const Tooltip = cs({
  data: pieData,
  options: {
    tooltip: {
      padding: 0,
    },
    callbacks: {
      tooltip: {
        formatValue: (v: number | string) => `$${v}`,
        getContent: (p: any, ticket: any, callback: any) => {
          setTimeout(() => {
            callback(
              ticket,
              `<div style="padding: 0.5rem; background-color: ${p.color}; border-radius: 4px; border: solid 1px #fff; color: #fff;"><b>${p.name}</b><br /><div>${p.value}  &nbsp;&nbsp;&nbsp;&nbsp; ${p.percent}%</div></div>`
            );
          }, 2000);
          return 'Loading (2s)';
        },
      },
    },
  },
});

export const Legend = cs({
  options: {
    legend: {
      show: true,
      position: Position.Right,
      width: 180,
      type: 'scroll',
      icon: Icon.None,
      textStyle: {
        rich: {
          title: {
            color: '#ffffff',
            align: 'center',
            backgroundColor: true, // true, will be the icon color.
            fontWeight: 'bold',
            padding: 5,
            width: 170,
            borderRadius: [4, 4, 0, 0],
          },
          l: {
            align: 'center',
            width: 40,
            padding: 5,
            backgroundColor: '#ddd',
          },
          c: {
            align: 'right',
            width: 50,
            padding: 5,
            backgroundColor: '#eee',
          },
          r: {
            align: 'right',
            width: 60,
            padding: 5,
            backgroundColor: '#efefef',
          },
        },
      },
    },
    label: {
      show: false,
    },
    callbacks: {
      legend: {
        formatLabel: (context: LegendItemContext) => {
          const r =
            `{title|${context.name}}\n` +
            `${context.details
              .map((d) => {
                const total = context.details
                  .map((d) => d.value ?? 0)
                  .reduce((t, c) => t + c, 0);
                const p =
                  total !== 0
                    ? Math.floor(((d.value ?? 0) * 1000) / total) / 10
                    : 0;
                return `{l|${d.name}}{c|${p}%}{r|${d.value ?? '-'}}`;
              })
              .join('\n')}`;
          return r;
        },
      },
    },
    series: [{ name: '2020' }, { name: '2021' }],
  },
  data: [pieDataSmall, pieData],
});

export const Dark = cs({
  options: {
    // backgroundColor: 'rgba(0,0,0,1)',
    colors: [
      '#19D0CD',
      '#DE196B',
      '#FC5F5C',
      '#FFD771',
      '#DA00FF',
      '#9001CB',
      '#D4BBFF',
      '#72CCFF',
      '#2E96FF',
      '#3B48E0',
      '#0059B2',
      '#2E96FF',
      '#FFC24C',
      '#F38200',
      '#2ABFDE',
      '#1F94AD',
      '#BD2C38',
      '#FF3143',
      '#FF8282',
      '#FFF1F1',
    ],
    label: {
      percentToHide: 5,
      highlight: true,
    },
  },
  data: pieDataLarge,
  isDark: true,
});
