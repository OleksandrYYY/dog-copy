import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function setupListBreeds(inputBreedValue = "") {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;
    const { allBreeds, visitBreeds } = paramsBreed.data;

    const listBreeds = document.createElement("ul");
    containerListBreeds.innerHTML = "";
    containerListBreeds.append(listBreeds);

    const filterBreeds = UiAction.filtrationBreeds(allBreeds, inputBreedValue);

    if (filterBreeds.length > 0) {
        filterBreeds.forEach((breed) => {
            const getNameBreedDog = document.createElement("li");
            getNameBreedDog.textContent = breed.name;
            getNameBreedDog.value = breed.id;
            listBreeds.append(getNameBreedDog);

            const breedInVisitBreeds = UiAction.findVisitedBreeds(visitBreeds, breed.id);
            
            if (breedInVisitBreeds) {
                getNameBreedDog.classList.add("viewed");
            };

            getNameBreedDog.addEventListener("click", async () => {
                try {
                    await UI.handlerListBreeds(breedInVisitBreeds, breed);
                } catch (error) {
                    UiAction.catchingBlockError(
                        error,
                        "Сталася помилка при обробці породи",
                        {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
                    );
                }
            });
        })
    } else {
        containerRandomImg.innerHTML = "<h2> Такої породи не існує </h2>";
    };
};
