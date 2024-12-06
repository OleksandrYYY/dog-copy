import * as UI from "../UI/index.js";

export function searchAndSelectBreed(inputBreedValue = "") {
    UI.setupSelectBreed(inputBreedValue);    
    UI.setupListBreeds(inputBreedValue);
};
