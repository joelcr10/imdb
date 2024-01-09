export const returnGenre = (genreIds, genreList) => {
    const genresList = [];
    genreIds.map(genreId => {
        for (let i = 0; i < genreList.genres.length; i++) {
            if (genreId == genreList.genres[i].id) {
                genresList.push(genreList.genres[i].name);
            }
        }
    });
    return genresList;

};