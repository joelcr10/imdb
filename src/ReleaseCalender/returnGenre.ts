export const returnGenre = (genreIds: number[], genreList: { genres: { id: number; name: string }[] }): string[] => {
    const genresList: string[] = [];
    genreIds.forEach((genreId) => {
        for (let i = 0; i < genreList.genres.length; i++) {
            if (genreId === genreList.genres[i].id) {
                genresList.push(genreList.genres[i].name);
            }
        }
    });
    return genresList;
};
