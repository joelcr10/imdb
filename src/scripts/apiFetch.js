

export const apiFetch = async (apiUrl) =>{
    // const apiUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
    const API_KEY = 'Bearer 8b701ace30227088c2f1ef89b747c764';
    const ACCESS_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjcwMWFjZTMwMjI3MDg4YzJmMWVmODliNzQ3Yzc2NCIsInN1YiI6IjY1NzY4MGMzZWM4YTQzMDBhYTZjMmMyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.167UEzpKnunnh1afpyWcQ0V3hUiVprn3mXD02DDd7cA';

    const options = {
        method: 'GET',
        headers: {
            'Authorization': ACCESS_TOKEN,    
            'accept': 'application/json'
        }
    };
    try{
        const response = await fetch(apiUrl,options);
        const result = await response.json();

        // console.log("result",result);

        return result;

    }catch(err){
        console.log(err);
    }

}