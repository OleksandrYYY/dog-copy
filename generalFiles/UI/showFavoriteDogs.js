import * as LocalStorage from "../LocalStorage/index.js";
import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export function showFavoriteDogs() {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerFavoriteImages, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;
    
    const showFavDogs = LocalStorage.getLocalStorage("dogs");
    containerFavoriteImages.innerHTML = "";

    const getBtnGoBack = UiAction.createBackButton(
        "Повернутися назад",
        {
            toggleElements: [containerListBreeds, btnShowRndDog, btnShowFavDogs],
            toggleVisibilityState: true,
            searchBreed: true
        },
        () => {
            containerFavoriteImages.innerHTML = "";
        }
    );
    containerFavoriteImages.append(getBtnGoBack);

    if (showFavDogs.length > 0) {
        showFavDogs.forEach((elem, index) => {
            const showImgFavDog = document.createElement("img");
            showImgFavDog.src = elem.urlDog;
            showImgFavDog.alt = "Favorite Dog Image";

            const deleteFavoriteDog = UI.createButton("Видалити улюблену собаку", () => {
                showFavDogs.splice(index, 1);
                LocalStorage.setLocalStorage("dogs", showFavDogs)
                UI.showFavoriteDogs();
            });

            containerFavoriteImages.append(showImgFavDog, deleteFavoriteDog);
        })
    } else {
        containerFavoriteImages.innerHTML = "<p>Немає збережених зображень.</p>";
        
        const buttonBack = UiAction.createBackButton(
            "Назад",
            {
                toggleElements: [containerListBreeds, btnShowRndDog, btnShowFavDogs],
                toggleVisibilityState: true,
                searchBreed: true
            },
            () => {
                containerFavoriteImages.innerHTML = "";
            }
        );
        containerFavoriteImages.append(buttonBack);
    };
};
