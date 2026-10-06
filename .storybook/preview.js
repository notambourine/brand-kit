import "../tokens.css";
import "../components.css";
import "../prose.css";

export default {
  parameters: { layout: "padded" },
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: { icon: "mirror", items: ["dark", "light"], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "dark" },
  decorators: [
    (story, { globals }) => {
      document.documentElement.classList.toggle(
        "theme-light",
        globals.theme === "light",
      );
      return story();
    },
  ],
  tags: ["autodocs"],
};
