import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./carousel";

import { AppContainer } from "react-hot-loader";

function render(Component) {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById("react-root")
    );
}

render(Carousel);

if (module.hot) {
    module.hot.accept("./carousel.js", () => {
        const NewCarousel = require("./carousel.js").default;
        render(NewCarousel);
    });
}
