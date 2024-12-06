import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";

export async function handlerSelectBreed(selectIdBreed) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;
    const { visitBreeds } = paramsBreed.data;

    try {
        const breedInVisitBreeds = UiAction.findVisitedBreeds(visitBreeds, selectIdBreed);
    
        const getBtnBack = UiAction.createBackButton(
            "Назад",
            {
                toggleElements: [btnShowRndDog, btnShowFavDogs],
                toggleVisibilityState: true,
                searchBreed: true
            }
        );
        containerRandomImg.append(getBtnBack);

        if (breedInVisitBreeds) {
            UI.updateListBreeds(containerListBreeds);

            const showAgainButton = UI.createButton("Переглянути ще раз", () => {
                UiAction.toggleVisibility([containerListBreeds, getBtnBack], false);
                UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], true);

                const getBtnGoBack = UiAction.createBackButton(
                    "Повернутися назад",
                    {
                        toggleElements: [containerListBreeds, btnShowRndDog, btnShowFavDogs],
                        toggleVisibilityState: true,
                        searchBreed: true
                    }
                );
                containerRandomImg.append(getBtnGoBack);

                breedInVisitBreeds.images.forEach((image) => {
                    UI.showRandomDog(image, selectIdBreed);
                });
            });
            containerListBreeds.append(showAgainButton);
            UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);
        } else {
            containerListBreeds.innerHTML = "";
            await API.fetchApiGetBreedId(selectIdBreed);
        };
    } catch (error) {
        UiAction.catchingBlockError(
            error,
            "Сталася помилка при обробці вибору породи",
            {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
        );
    };
};
