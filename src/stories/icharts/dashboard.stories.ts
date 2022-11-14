import type { Meta, StoryObj } from '@storybook/angular/';

import { DashboardComponent } from './dashboard.component';

const meta: Meta<DashboardComponent> = {
  title: 'My Stories/icharts/Dashboard',
  component: DashboardComponent,
  // tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DashboardComponent>;

export const Default: Story = {
  args: {},
};
