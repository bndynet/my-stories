import { ChartOptions, ChartData, Chart } from '@bndynet/icharts';
import { Meta, StoryObj } from '@storybook/angular';
import { ChartComponent } from './chart.component';
import { merge } from 'lodash-es';

export type StoryInputs<TData, TOptions> = {
  data?: TData;
  options?: TOptions;
  size?: { width?: number | string; height?: number | string };
  isDark?: boolean;
  styles?: object;

  chart?: object;
  viewInit?: boolean;
  rendered?: (chart: Chart) => void;
};

export function createStory<
  TData extends ChartData,
  TOptions extends ChartOptions<TData>,
>(args: StoryInputs<TData, TOptions>): StoryObj<ChartComponent> {
  return {
    args,
  };
}

export function cloneStory<
  TData extends ChartData,
  TOptions extends ChartOptions<TData>,
>(
  story: StoryObj<ChartComponent>,
  args: StoryInputs<TData, TOptions>
): StoryObj<ChartComponent> {
  return merge({}, story, {
    args,
  });
}

export const meta: Meta<ChartComponent> = {
  title: 'My Stories/icharts/',
  component: ChartComponent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: {
        type: 'object',
      },
    },
    isDark: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    rendered: {
      action: 'rendered',
    },
  },
};
