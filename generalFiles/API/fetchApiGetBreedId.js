import * as LocalStorage from "../LocalStorage/index.js";
import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export async function fetchApiGetBreedId(id, limit = 10) {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;
    const { visitBreeds } = paramsBreed.data;

    try {
        let breedInVisitBreeds = UiAction.findVisitedBreeds(visitBreeds, id);
    
        if (!breedInVisitBreeds) {
            breedInVisitBreeds = { breedId: id, images: [] };
            visitBreeds.push(breedInVisitBreeds);
        };
    
        const viewedImages = breedInVisitBreeds.images.map(img => img.id);
    
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=${limit}&breed_ids=${id}`);
        const newImages = await response.json();
    
        const uniqueNewImages = newImages.filter(img => !viewedImages.includes(img.id));
    
        uniqueNewImages.forEach(image => {        
            UI.showRandomDog(image, id);
            breedInVisitBreeds.images.push(image);
            LocalStorage.setLocalStorage("visitedBreeds", visitBreeds);
        });
    
        return newImages;

    } catch (error) {
        console.error("Помилка при отриманні зображень:", error.message);
        containerRandomImg.innerHTML = "";
        UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);
        containerRandomImg.innerHTML = `<p>Зображення не знайдені або сталася помилка - ${error.message}.</p>`;

        const getBtnBack = UiAction.createBackButton(
            "Повернутися назад",
            {
                toggleElements: [containerListBreeds, btnShowRndDog, btnShowFavDogs],
                toggleVisibilityState: true,
                searchBreed: true
            }
        );
        containerRandomImg.append(getBtnBack);
        UiAction.toggleVisibility([containerListBreeds], false);
    };
};
