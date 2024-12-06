import * as UiAction from "../UiAction/index.js";
import * as API from "../API/index.js";

export async function handlerListBreeds(breedInVisitBreeds, breed) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;
    const { currentIdBreed } = paramsBreed.data;
    
    try {
        containerRandomImg.innerHTML = "";
        currentIdBreed.id = breed.id;

        UiAction.toggleVisibility([btnShowRndDog], true);

        if (breedInVisitBreeds) {
            UiAction.handlerVisitedBreed(breedInVisitBreeds, breed);
            return;
        };

        await API.fetchAndDisplayImages(breed);

    } catch (error) {
        UiAction.catchingBlockError(
            error,
            "Сталася помилка при обробці породи",
            {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
        );
    };
};
