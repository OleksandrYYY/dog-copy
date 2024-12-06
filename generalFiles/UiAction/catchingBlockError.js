import * as UiAction from "./index.js";

export function catchingBlockError(error, text, { containerListBreeds, containerRandomImg, btnShowRndDog, btnShowFavDogs }) {
    console.error("Помилка:", error.message);
    containerListBreeds.innerHTML = "";
    UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);
    containerRandomImg.innerHTML = `<p>${text} - ${error.message}.</p>`;

    const getBtnBack = UiAction.createBackButton(
        "Повернутися назад",
        {
            toggleElements: [btnShowRndDog, btnShowFavDogs],
            toggleVisibilityState: true,
            searchBreed: true
        }
    );
    containerRandomImg.append(getBtnBack);
};
