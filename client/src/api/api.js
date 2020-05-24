import axios from 'axios';
import {API_AUTH_KEY, API_MOVIE_URL, API_LANG, API_PERSON_URL, API_SEARCH, API_GENRES} from '../config.json';



const API = {
    image: (img) => {
        const size = 'w500';
        return `https://image.tmdb.org/t/p/${size}/${img}`;
    },

    genres: async () => {
        return await axios.get(`${API_GENRES}?api_key=${API_AUTH_KEY}&language=${API_LANG}`);
    },

    movies:{
        popular: async (page=1) => {
            try{
                return await axios.get(`${API_MOVIE_URL}/popular/?api_key=${API_AUTH_KEY}&language=${API_LANG}&page=${page}`);
            }   
            catch(err){
                console.log(err.response);
            }
        },

        topRated: async (page=1) => {
            try{
                return await axios.get(`${API_MOVIE_URL}/top_rated/?api_key=${API_AUTH_KEY}&language=${API_LANG}&page=${page}`);
            }   
            catch(err){
                console.log(err.response);
            }
        },

        detail: async (movie_id) => {
            try{
                return await axios.get(`${API_MOVIE_URL}/${movie_id}?api_key=${API_AUTH_KEY}&language=${API_LANG}`)
            }catch(err){
                console.log(err.response);
            }
        },

        credits: async (movie_id) => {
            return await axios.get(`${API_MOVIE_URL}/${movie_id}/credits?api_key=${API_AUTH_KEY}`);
        },

        recommendations: async (movie_id) => {
            return await axios.get(`${API_MOVIE_URL}/${movie_id}/recommendations?api_key=${API_AUTH_KEY}&language=${API_LANG}&page=1`);
        }

    },

    person: {
        credits: async (person_id) => {
            return await axios.get(`${API_PERSON_URL}/${person_id}/movie_credits?api_key=${API_AUTH_KEY}&language=${API_LANG}`);
        },
        detail: async (person_id)=>{
            return await axios.get(`${API_PERSON_URL}/${person_id}?api_key=${API_AUTH_KEY}&language=${API_LANG}`);
        }
    },

    search:{
        movie: async (movie) => {
            return await axios.get(`${API_SEARCH}/movie?api_key=${API_AUTH_KEY}&language=${API_LANG}&query=${movie}`);
        },

        person: async (person) => {
            return await axios.get(`${API_SEARCH}/person?api_key=${API_AUTH_KEY}&language=${API_LANG}&query=${person}`);
        }
    }
}

export default API;