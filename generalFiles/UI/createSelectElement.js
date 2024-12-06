export function createSelectElement() {
    const selectBreed = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Виберіть породу";
    defaultOption.value = "";
    selectBreed.append(defaultOption);

    return { selectBreed, defaultOption };
};
