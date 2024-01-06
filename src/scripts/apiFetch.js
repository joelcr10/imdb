import {tmdbAPI} from "../../config.js";

export const apiFetch = async (apiUrl) =>{
    
    const API_KEY = tmdbAPI.API_KEY;
    const ACCESS_TOKEN = tmdbAPI.ACCESS_TOKEN;
    
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