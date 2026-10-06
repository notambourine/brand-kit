export default {
  framework: "@storybook/html-vite",
  stories: ["../stories/*.stories.js"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  core: { disableTelemetry: true },
  // /logo/ matches the URL consumers serve the kit's artwork from, so examples/ paste as-is.
  staticDirs: [{ from: "../logo", to: "/logo" }, "./public"],
};
