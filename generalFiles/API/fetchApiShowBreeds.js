import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export async function fetchApiShowBreeds() {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, containerBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;

    try {
        const response = await fetch("https://api.thedogapi.com/v1/breeds");
        const allBreeds = await response.json();

        const { selectBreed, defaultOption } = UI.createSelectElement();
        const inputBreed = UI.createInputElement();
    
        paramsBreed.elements.selectBreed = selectBreed;
        paramsBreed.elements.defaultOption = defaultOption;
        paramsBreed.elements.inputBreed = inputBreed;
        paramsBreed.data.allBreeds = allBreeds;
    
        UiAction.searchAndSelectBreed();

        UiAction.inputBreedHandler();

        selectBreed.addEventListener("change", async(event) => {
            try {
                containerRandomImg.innerHTML = "";
                UiAction.toggleVisibility([containerListBreeds],true);
                const selectIdBreed = Number(event.target.value);
                await UI.handlerSelectBreed(selectIdBreed);
            } catch (error) {
                UiAction.catchingBlockError(
                    error,
                    "Сталася помилка",
                    {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
                );
            };
        });

        containerBreeds.append(inputBreed, selectBreed);

        return { allBreeds, selectBreed, defaultOption };

    } catch (error) {
        console.error("Помилка при отриманні порід:", error.message);
    };
};
