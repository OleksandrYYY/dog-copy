import * as LocalStorage from "../LocalStorage/index.js";
let paramsBreed = null;

export function getParamsBreed() {
    if (!paramsBreed) {
        paramsBreed = {
            elements: {
                containerRandomImg: document.querySelector("#container-random-images"), 
                containerBreeds: document.querySelector("#container-breeds"), 
                containerListBreeds: document.querySelector("#container-list-breeds"),
                containerFavoriteImages: document.querySelector("#container-favorite-images"),
                btnShowRndDog: document.querySelector("#btn-show-random-dog"), 
                btnShowFavDogs: document.querySelector("#btn-show-favorite-dog"),
                selectBreed: null,
                defaultOption: null,
                inputBreed: null
            },
            data: {
                visitBreeds: LocalStorage.getLocalStorage("visitedBreeds"), 
                currentIdBreed: { id: null },
                allBreeds: null
            }
        };
    };

    return paramsBreed;
};
