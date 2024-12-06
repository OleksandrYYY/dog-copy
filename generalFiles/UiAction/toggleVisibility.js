export function toggleVisibility(elements, value) {
    const displayValue = value ? "block" : "none";
    elements.forEach(element => element.style.display = displayValue);
};
