import { fn } from '@storybook/test';
import { Position, XYChartOptions } from '@bndynet/icharts';
import { createStory, meta } from './utils';
import { g } from './xy.data';

export default {
  ...meta,
  title: 'example/icharts/XY',
  args: {
    type: 'line',
    // size: {
    //   height: 500,
    // }
  },
};

export const Default = createStory<XYChartOptions>({
  data: g(5, 12),
  options: {
    dataKey: 'xKey',
  },
});

export const Bar = createStory<XYChartOptions>({
  data: g(2, 5, true),
  options: {
    dataKey: 'xKey',
    variant: 'bar',
    barMaxWidth: 25,
    legend: {
      position: Position.Top,
    },
    seriesLabel: {
      show: true,
    }
  } as XYChartOptions,
});

export const StackedBar = createStory<XYChartOptions>({
  data: g(5, 12, true, (seriesIndex: number) =>
    seriesIndex === 4 ? { min: 9000, max: 10000 } : { min: 0, max: 10000 }
  ),
  options: {
    dataKey: 'xKey',
    variant: 'bar',
    stacked: true,
    barRadius: 40,
    barMaxWidth: 20,
    legend: {
      position: Position.Top,
    },
  },
});

export const Area = createStory<XYChartOptions>({
  data: g(5, 12, true),
  options: {
    dataKey: 'xKey',
    stacked: true,
    variant: 'area',
    legend: {
      position: Position.Top,
    },
  },
});
