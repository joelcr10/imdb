"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGenre = void 0;
var returnGenre = function (genreIds, genreList) {
    var genresList = [];
    genreIds.forEach(function (genreId) {
        for (var i = 0; i < genreList.genres.length; i++) {
            if (genreId === genreList.genres[i].id) {
                genresList.push(genreList.genres[i].name);
            }
        }
    });
    return genresList;
};
exports.returnGenre = returnGenre;
