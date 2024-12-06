import * as UI from "../UI/index.js";
import * as UiAction from "./index.js";

export function handlerVisitedBreed(breedInVisitBreeds, breed) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog } = paramsBreed.elements;
    
    UiAction.toggleVisibility([btnShowRndDog], false);
    UI.updateListBreeds(containerListBreeds);

    const getBtnBack = UiAction.createBackButton(
        "Назад",
        {
            toggleElements: [btnShowRndDog],
            toggleVisibilityState: true,
            searchBreed: true
        }
    );
    containerListBreeds.append(getBtnBack);

    const showAgainButton = UI.createButton("Переглянути ще раз", () => {
        containerRandomImg.innerHTML = "";
        containerListBreeds.innerHTML = "";
        UiAction.toggleVisibility([getBtnBack], false);
        UiAction.toggleVisibility([btnShowRndDog], true);

        const getBtnGoBack = UiAction.createBackButton(
            "Повернутися назад",
            {
                toggleElements: [containerListBreeds, btnShowRndDog],
                toggleVisibilityState: true,
                searchBreed: true
            }
        );
        containerRandomImg.append(getBtnGoBack);

        breedInVisitBreeds.images.forEach((image) => {
            UI.showRandomDog(image, breed.id);
        });
    });
    containerListBreeds.append(showAgainButton);
};
