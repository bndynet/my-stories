import { fn } from '@storybook/test';
import {
  Position,
  XYChartData,
  XYChartOptions,
  XYChartVariant,
} from '@bndynet/icharts';
import { cloneStory, createStory, meta, StoryInputs } from './utils';
import {
  DATA_XY_CHART,
  DATA_XY_CHART_BY_SERIES,
  DATA_XY_CHART_SMALL,
  DATA_XY_CHART_SPARK,
  DATA_XY_CHART_TIME,
  gXYData,
} from './xy.data';
import { merge } from 'lodash-es';
import { DEFAULT_SERIES_NAME } from './data';

export default {
  ...meta,
  title: 'My Stories/icharts/XY',
  args: {
    type: 'line',
  },
};

function cs(args: StoryInputs<XYChartData, XYChartOptions>) {
  return createStory<XYChartData, XYChartOptions>(
    merge(
      {
        options: {
          dataKey: 'xKey',
        },
        size: {
          height: 400,
        },
      },
      args
    )
  );
}

export const Line = cs({
  data: DATA_XY_CHART,
  options: {
    series: [
      {
        name: '*',
        showPoint: false,
      },
    ],
  },
});

export const Time = cs({
  data: DATA_XY_CHART_TIME,
  options: {
    callbacks: {
      formatTime: (value: number | string) => {
        const dt = new Date(value);
        return dt.getMinutes() === 0 ? `${dt.getHours()}:00` : `${dt.getHours()}:${dt.getMinutes()}`;
      },
    },
  },
});

export const Marks = cs({
  data: DATA_XY_CHART_SPARK,
  options: {
    grid: {
      right: 100,
    },
    yAxis: [
      {
        formatLabel: (value) => `${value}%`,
        showAxisLine: false,
      },
    ],
    series: [
      {
        name: DEFAULT_SERIES_NAME,
        showAverageLine: true,
        showMaxLine: true,
        showMinLine: true,
        showMaxBubble: true,
        showMinBubble: true,
      },
    ],
  },
});

export const Bar = cs({
  data: DATA_XY_CHART_SMALL,
  options: {
    variant: XYChartVariant.Bar,
    legend: {
      position: Position.Bottom,
    },
    yAxis: [
      {
        name: 'Visits',
        nameGap: 40,
      },
    ],
    series: [
      {
        name: '*',
        showLabel: true,
        labelPosition: 'outside',
      },
    ],
  },
});

export const StackedBar = cs({
  data: gXYData(5, 12, true, (seriesIndex: number) =>
    seriesIndex === 4 ? { min: 9000, max: 10000 } : { min: 0, max: 10000 }
  ),
  options: {
    variant: XYChartVariant.Bar,
    stacked: true,
    barRadius: 40,
    barMaxWidth: 40,
    legend: {
      position: Position.Top,
    },
  },
});

export const Area = cs({
  data: DATA_XY_CHART_BY_SERIES,
  options: {
    colormap: { [DEFAULT_SERIES_NAME]: ['#FF0087', 'rgb(135, 0, 157)'] },
    series: [
      {
        name: '*',
        lineWidth: 0,
        showPoint: false,
      },
      {
        name: DEFAULT_SERIES_NAME,
        colorStart: Position.Top,
        colorEnd: Position.Bottom,
      },
    ],
    stacked: true,
    variant: XYChartVariant.Area,
    legend: {
      position: Position.Top,
    },
  },
});

export const MultipleAxes = cs({
  data: gXYData(5, 12, true),
  options: {
    lineWidth: 2,
    series: [
      {
        name: DEFAULT_SERIES_NAME,
        valueAxisIndex: 1,
        type: 'bar',
        lineType: 'dashed',
      },
    ],
  },
});

export const HorizontalBar = cs({
  data: gXYData(2, 7),
  options: {
    variant: XYChartVariant.HorizontalBar,
    barRadius: 50,
    stacked: true,
  },
});

export const SparkLine = cs({
  data: gXYData(1, 12, false),
  options: {
    variant: XYChartVariant.SparkLine,
    series: [
      {
        name: DEFAULT_SERIES_NAME,
        lineSmooth: 0,
      },
    ],
  },
  size: {
    width: 200,
    height: 100,
  },
  styles: {
    ['margin-top']: `100px`,
    overflow: 'hidden',
  },
});

export const SparkArea = cloneStory<XYChartData, XYChartOptions>(SparkLine, {
  options: {
    colormap: {
      [DEFAULT_SERIES_NAME]: ['#ff0000', 'rgba(255, 255, 255, 0.5)'],
    },
    series: [
      {
        name: DEFAULT_SERIES_NAME,
        lineSmooth: true,
      },
    ],
  },
});

export const SparkBar = cloneStory<XYChartData, XYChartOptions>(SparkLine, {
  options: {
    colormap: {
      [DEFAULT_SERIES_NAME]: (options: XYChartOptions) => {
        return [
          '#ff0000',
          options.theme === 'dark'
            ? 'rgba(0,0,0,0.5)'
            : 'rgba(255, 255, 255, 0.5)',
        ];
      },
    },
    variant: XYChartVariant.SparkBar,
  },
});
