import * as LocalStorage from "../LocalStorage/index.js";
import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export async function fetchAndDisplayImages(breed) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;
    const { visitBreeds } = paramsBreed.data;
    
    try {
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${breed.id}`);
        const dataImg = await response.json();

        UiAction.toggleVisibility([containerListBreeds], false);
        
        const getBtnBack = UiAction.createBackButton(
            "Повернутися назад",
            {
                toggleElements: [containerListBreeds],
                toggleVisibilityState: true,
                searchBreed: true
            }
        );
        containerRandomImg.append(getBtnBack);

        if (dataImg.length > 0) {

            visitBreeds.push({
                breedId: breed.id,
                images: dataImg,
            });

            LocalStorage.setLocalStorage("visitedBreeds", visitBreeds);

            dataImg.forEach((image) => {
                UI.showRandomDog(image, breed.id);
            });
        } else {
            containerRandomImg.innerHTML = "<p>Сталася помилка, зображення не знайдені.</p>";
            UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);
        
            const getBtnBack = UiAction.createBackButton(
                "Повернутися назад",
                {
                    toggleElements: [containerListBreeds, btnShowRndDog, btnShowFavDogs],
                    toggleVisibilityState: true,
                    searchBreed: true
                }
            );
            containerRandomImg.append(getBtnBack);
        };
    } catch (error) {
        UiAction.catchingBlockError(
            error,
            "Зображення не знайдені або сталася помилка",
            {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
        );
    };
};
