import * as LocalStorage from "../LocalStorage/index.js";
import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function showRandomDog(image, selectIdBreedValue) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg } = paramsBreed.elements;
    const { visitBreeds } = paramsBreed.data;

    const containerElements = document.createElement("div");

    const randomImgDog = document.createElement("img");
    randomImgDog.src = image.url;
    randomImgDog.alt = "Картинка випадкової собаки";

    const deleteRandomDog = UI.createButton("Видалити собаку", () => {
        const breedInVisitBreeds = UiAction.findVisitedBreeds(visitBreeds, selectIdBreedValue);
        if (breedInVisitBreeds) {
            breedInVisitBreeds.images = breedInVisitBreeds.images.filter(img => img.id !== image.id);
            LocalStorage.setLocalStorage("visitedBreeds", visitBreeds);
        } else {
            console.log("Породу не знайдено в масиві відвіданих порід.");
        };

        containerElements.remove();
    });

    const saveRandomDog = UI.createButton("Зберегти собаку", () => {
        UI.saveRandomDogs(image.url);
    });

    containerElements.append(
        randomImgDog,
        deleteRandomDog, 
        saveRandomDog
    );
    containerRandomImg.append(containerElements);
};
