import * as LocalStorage from "../LocalStorage/index.js";
import * as UiAction from "../UiAction/index.js";

export function saveRandomDogs(urlPicture) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;

    const saveUrlDogs = LocalStorage.getLocalStorage("dogs");
    const currentDog = saveUrlDogs.find(dog => dog.urlDog === urlPicture);

    if (!currentDog) {

        if (saveUrlDogs.length >= 20) {
            saveUrlDogs.pop();
        };

        saveUrlDogs.push({urlDog:urlPicture});
        LocalStorage.setLocalStorage("dogs", saveUrlDogs);
    } else {
        containerRandomImg.innerHTML = "<p>Це зображення вже в списку улюблених.</p>";
        UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);

        const getBtnBack = UiAction.createBackButton(
            "Повернутися назад",
            {
                toggleElements: [containerListBreeds, btnShowRndDog, btnShowFavDogs],
                toggleVisibilityState: true,
                searchBreed: true
            }
        );
        containerRandomImg.append(getBtnBack);
    };
};
