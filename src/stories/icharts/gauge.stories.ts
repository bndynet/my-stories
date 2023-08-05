import { fn } from '@storybook/test';
import {
  GaugeChart,
  GaugeChartData,
  GaugeChartOptions,
  GaugeChartVariant,
} from '@bndynet/icharts';
import { createStory, meta, StoryInputs } from './utils';
import { Chart } from '@bndynet/icharts/dist/types/scripts/core/chart';

function cs(args: StoryInputs<GaugeChartData, GaugeChartOptions>) {
  return createStory<GaugeChartData, GaugeChartOptions>(args);
}

export default {
  ...meta,
  title: 'My Stories/icharts/Gauge',
  args: {
    type: 'gauge',
  },
};

export const Default = cs({
  size: {
    height: 200,
  },
  data: {
    value: 34,
    maxValue: 240,
  },
  options: {
    secondaryText: 'km/h',
    // primaryTextColor: '#333333',
    // secondaryTextColor: '#aaaaaa',
  },
  rendered: (chart: Chart) => {
    const c = chart as GaugeChart;
    setInterval(() => {
      const val = Math.round(Math.random() * 240);
      c.setValue(val);
    }, 2000);
  },
});

export const BackgroundImage = cs({
  data: {
    value: 12,
    maxValue: 200,
  },
  size: {
    height: 150,
  },
  options: {
    variant: GaugeChartVariant.Percentage,
    indicatorBackgroundImage: '/custom-gauge-panel.png',
    // indicatorWidth: 15,
  },
  rendered: (chart: Chart) => {
    const c = chart as GaugeChart;
    setInterval(() => {
      const val = Math.round(Math.random() * 200);
      c.setValue(val);
    }, 2000);
  },
});

export const Percentage = cs({
  data: {
    value: 12,
    maxValue: 200,
  },
  size: {
    height: 150,
  },
  options: {
    variant: GaugeChartVariant.Percentage,
    textBackgroundColor: (chart: GaugeChart) =>
      chart.isDark ? '#000000' : '#ffffff',
    primaryTextColor: (chart: GaugeChart) =>
      chart.isDark ? '#ffffff' : '#333333',
  },
  rendered: (chart: Chart) => {
    const c = chart as GaugeChart;
    setInterval(() => {
      const val = Math.round(Math.random() * 200);
      c.setValue(val);
    }, 2000);
  },
});
