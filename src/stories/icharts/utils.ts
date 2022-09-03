import { ChartOptions, ChartData } from '@bndynet/icharts';
import { Meta, StoryObj } from '@storybook/angular';
import { ChartComponent } from './chart.component';

export type ChartStory<TOptions = ChartOptions<ChartData>> = {
  options?: TOptions;
  data: any;
  isDark?: boolean;
  size?: { width?: string | number; height: string | number };
};

export function createStory<TChartOptions>(
  story: ChartStory<TChartOptions>
): StoryObj<ChartComponent> {
  return {
    args: story,
  } as StoryObj<ChartComponent>;
}

export const meta: Meta<ChartComponent> = {
  // title: 'Example/ICharts/XY',
  component: ChartComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: {
        type: 'object',
      },
    },
  },
};
