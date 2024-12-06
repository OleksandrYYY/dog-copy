export function  filtrationBreeds(allBreeds, inputBreedValue) {
    const filterBreeds = allBreeds.filter(
        (breed) =>
        breed.name.toLowerCase().startsWith(inputBreedValue.toLowerCase())
    );
    
    return filterBreeds;
};
