import badges from "../examples/badges.html?raw";
import buttons from "../examples/buttons.html?raw";
import cards from "../examples/cards.html?raw";
import form from "../examples/form.html?raw";

export default { title: "Components" };

export const Buttons = { render: () => buttons };
export const Badges = { render: () => badges };
export const Cards = { render: () => cards };
export const Form = { render: () => form };
