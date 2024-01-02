const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTc0OGYxMWVlY2YwYTNjOWE4ODM0NDhiZTUxNmI4MyIsInN1YiI6IjY1ODE2NzBmODc1ZDFhMDdkZmFlZTgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EvpMF4IBQ8n8RIPmnupE3K1p0sXyDo-VqS0BbbmJqUM';

function fetchData(endpoint) {
    const url = `https://api.themoviedb.org/3${endpoint}?language=en-US`;
    const headers = {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
    };

    return fetch(url, { headers }).then(response => response.json());
}

function displayContent(content, containerId) {
    const contentDiv = document.getElementById(containerId);
    contentDiv.innerHTML = '';

    content.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const title = document.createElement('h3');
        title.textContent = item.title || item.name;

        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w185${item.poster_path}`;
        poster.alt = title.textContent;

        card.appendChild(title);
        card.appendChild(poster);
        contentDiv.appendChild(card);
    });
}

function displayFilmography(credits) {
    const filmographyCards = document.querySelector('.filmography-cards');

    credits.forEach(credit => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';

        const poster = document.createElement('img');
        poster.src = `https://image.tmdb.org/t/p/w185${credit.poster_path}`;
        poster.alt = credit.title || credit.name;

        const title = document.createElement('h3');
        title.textContent = credit.title || credit.name;

        const year = document.createElement('p');
        year.textContent = `Year: ${credit.release_date ? credit.release_date.substring(0, 4) : 'N/A'}`;

        filmCard.appendChild(poster);
        filmCard.appendChild(title);
        filmCard.appendChild(year);

        filmographyCards.appendChild(filmCard);
    });
}

function fetchMoviesAndTVShows() {
    Promise.all([
        fetchData(`/person/${celebrityId}/movie_credits`),
        fetchData(`/person/${celebrityId}/tv_credits`)
    ]).then(([movieData, tvData]) => {
        const allCredits = [...movieData.cast, ...tvData.cast];
        displayContent(allCredits, 'movies-tab');
    });
}

function fetchFilmography() {
    fetchData(`/person/${celebrityId}/combined_credits`).then(data => {
        const credits = data.cast.filter(credit => credit.poster_path);
        displayFilmography(credits);
    });
}

function switchTab(tabName) {
    const moviesTab = document.getElementById('movies-tab');
    const filmographyTab = document.getElementById('filmography-tab');

    if (tabName === 'movies') {
        moviesTab.style.display = 'block';
        filmographyTab.style.display = 'none';
        fetchMoviesAndTVShows();
    } else if (tabName === 'filmography') {
        moviesTab.style.display = 'none';
        filmographyTab.style.display = 'block';
        fetchFilmography();
    }
}

// Initial load (default to Movies/TV Shows tab)
switchTab('movies');
