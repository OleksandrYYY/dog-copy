"use strict";
import * as UI from "./generalFiles/UI/index.js";
import * as UiAction from "./generalFiles/UiAction/index.js";
import * as API from "./generalFiles/API/index.js";

document.addEventListener("DOMContentLoaded", async () => {
    const paramsBreed = UiAction.getParamsBreed();
    const { btnShowRndDog, btnShowFavDogs, containerRandomImg, containerListBreeds, containerFavoriteImages } = paramsBreed.elements;

    try {
        const fetchResultShowBreeds = await API.fetchApiShowBreeds();
        paramsBreed.data.allBreeds = fetchResultShowBreeds.allBreeds;
        paramsBreed.elements.selectBreed = fetchResultShowBreeds.selectBreed;
        paramsBreed.elements.defaultOption = fetchResultShowBreeds.defaultOption;

        btnShowRndDog.addEventListener("click", async () => {
            try {
                const selectBreed = document.querySelector("select");
                const selectBreedValue = Number(selectBreed.value);
        
                containerFavoriteImages.innerHTML = "";

                if (selectBreedValue) {
                    await API.fetchApiGetBreedId(selectBreedValue, 1);
                } else if (paramsBreed.data.currentIdBreed.id) {
                    await API.fetchApiGetBreedId(paramsBreed.data.currentIdBreed.id, 1);
                } else {
                    await API.fetchApiDog();
                };
            } catch (error) {
                UiAction.catchingBlockError(
                    error,
                    "Помилка при обробці",
                    {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
                );
            };
        });

        btnShowFavDogs.addEventListener("click", () => {
            if (!paramsBreed.data.allBreeds) {
                console.error("Список порід ще не завантажився. Спробуйте пізніше.");
                return;
            };
            containerRandomImg.innerHTML = "";
            UiAction.toggleVisibility([containerListBreeds, btnShowFavDogs, btnShowRndDog], false);

            UI.showFavoriteDogs();
        });
    } catch (error) {
        console.error("Помилка при ініціалізації додатку:", error);
        UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);
    };
});    
