const key = import.meta.env.VITE_TMDB_KEY;
const baseURL = "https://api.themoviedb.org/3"

const endpoints = {
    popular: `${baseURL}/movie/popular?api_key=${key}`,
    topRated: `${baseURL}/movie/top_rated?api_key=${key}`,
    trending: `${baseURL}/movie/popular?api_key=${key}&language=en-US&page=2`,
    comedy: `${baseURL}/search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
    upcoming: `${baseURL}/movie/upcoming?api_key=${key}`,
};

export  function createImageUrl(filename, size) {
    return `https://image.tmdb.org/t/p/${size}/${filename}`
}

export default endpoints;