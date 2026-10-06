import footer from "../examples/footer.html?raw";
import header from "../examples/header.html?raw";
import hero from "../examples/hero.html?raw";

export default { title: "Shell", parameters: { layout: "fullscreen" } };

export const Header = { render: () => header };
export const Footer = { render: () => footer };
export const Hero = { render: () => hero };
export const Page = {
  render:
    () => `<div style="min-height: 100vh; display: flex; flex-direction: column">
    ${header.replace(/<a href="\/" class="nt-brand"[\s\S]*?<\/a>/, "")}
    <main style="flex: 1; display: flex; flex-direction: column; justify-content: center">${hero}</main>
    ${footer}
  </div>`,
};
