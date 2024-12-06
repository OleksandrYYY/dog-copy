export function createButton(text, onClickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClickHandler);

    return button;
};
