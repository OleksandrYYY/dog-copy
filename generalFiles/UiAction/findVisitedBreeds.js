export function findVisitedBreeds(visitBreeds, selectIdBreed) {
    const breedInVisitBreeds = visitBreeds.find(breed => breed.breedId === selectIdBreed);

    return breedInVisitBreeds;
};
