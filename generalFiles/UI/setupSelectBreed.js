import * as UiAction from "../UiAction/index.js";

export function setupSelectBreed(inputBreedValue = "") {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, selectBreed, defaultOption } = paramsBreed.elements;
    const { allBreeds } = paramsBreed.data;
    
    selectBreed.innerHTML = "";
    selectBreed.append(defaultOption);
    
    const filterBreeds = UiAction.filtrationBreeds(allBreeds, inputBreedValue);

    if (filterBreeds.length > 0) {
        filterBreeds.forEach((breed) => {
            const optionBreed = document.createElement("option");
            optionBreed.textContent = breed.name;
            optionBreed.value = breed.id;
            selectBreed.append(optionBreed);
            containerRandomImg.innerHTML = "";
        });
    };
};
