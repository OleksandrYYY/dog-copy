import * as UiAction from "./index.js";

export function inputBreedHandler() {
    const paramsBreed = UiAction.getParamsBreed();
    const { inputBreed } = paramsBreed.elements;

    inputBreed.addEventListener("input", (event) => {
        const inputBreedValue = event.target.value;
        UiAction.searchAndSelectBreed(inputBreedValue);
    });
};
