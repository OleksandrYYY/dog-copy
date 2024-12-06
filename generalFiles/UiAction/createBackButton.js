import * as UI from "../UI/index.js";
import * as UiAction from "./index.js";

export function createBackButton(buttonName, options = {}, additionalFunctionality = null) {
    const {
        toggleElements = [],
        toggleVisibilityState = true,
        searchBreed = true
    } = options;

    const getBtnBack = UI.createButton(buttonName, () => {
        if (searchBreed) {
            UiAction.searchAndSelectBreed();
        };
        if (toggleElements.length > 0) {
            UiAction.toggleVisibility(toggleElements, toggleVisibilityState);
        };
        if (typeof additionalFunctionality === "function") {
            additionalFunctionality();
        };
    });
    
    return getBtnBack;
};
