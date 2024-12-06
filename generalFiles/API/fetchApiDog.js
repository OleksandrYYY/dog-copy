import * as UI from "../UI/index.js";
import * as UiAction from "../UiAction/index.js";

export async function fetchApiDog() {
    const paramsBreed = UiAction.getParamsBreed();
    const { containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs } = paramsBreed.elements;

    try {
        const response = await fetch("https://api.thedogapi.com/v1/images/search?limit=10");

        if (!response.ok) {
            throw new Error(`Помилка: ${response.status} - ${response.statusText}`);
        };

        const getAllImages = await response.json();

        const widthMax = 650;
        const heightMax = 650;

        if(!Array.isArray(getAllImages)) {
            throw new Error("Очікувався масив зображень, але отримано інший тип даних.");
        };

        const getFilterImages = getAllImages.filter(({width, height}) =>
            width > 0 &&
            height > 0 &&
            width <= widthMax &&
            height <= heightMax
        );

        if (getFilterImages.length > 0) {
            const selectFirstImage = getFilterImages[0];
            const imageId = selectFirstImage.id;
            
            if (containerRandomImg.childElementCount >= 20) {
                containerRandomImg.firstElementChild.remove();
            };

            UI.showRandomDog(selectFirstImage, imageId);
        } else {
            containerRandomImg.innerHTML = "<p>Немає зображень, які відповідають критеріям.</p>";
            containerListBreeds.innerHTML = "";
            UiAction.toggleVisibility([btnShowRndDog, btnShowFavDogs], false);

            const getBtnBack = UiAction.createBackButton(
                "Повернутися назад",
                {
                    toggleElements: [btnShowRndDog, btnShowFavDogs],
                    toggleVisibilityState: true,
                    searchBreed: true
                }
            );
            containerRandomImg.append(getBtnBack);
        };

    } catch (error) {
        UiAction.catchingBlockError(
            error,
            "Помилка завантаження зображень. Спробуйте ще раз пізніше",
            {containerRandomImg, containerListBreeds, btnShowRndDog, btnShowFavDogs}
        );
    };
};
