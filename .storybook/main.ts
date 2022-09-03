import type { StorybookConfig } from "@storybook/angular";

const config: StorybookConfig = {
  core: {
    disableTelemetry: false, // 👈 Disables telemetry
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@chromatic-com/storybook", // visual tests
    // "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/angular",
    options: {},
  },
};
export default config;
