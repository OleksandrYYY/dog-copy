export function createInputElement() {
    const inputBreed = document.createElement("input");
    inputBreed.placeholder = "Шукати породу";
    inputBreed.type = "text";

    return inputBreed;
};
