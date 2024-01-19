const axios = require("axios").default;

import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_IMAGE_URL,
  ENDPOINTS,
  YT_BASE_URL,
} from "../Constants/Urls";

const TMBD_INITIAL_MOVIES_URL = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});



const getNowPlayingMovies = () =>
TMBD_INITIAL_MOVIES_URL.get(ENDPOINTS.NOW_PLAYING_MOVIES);

const getTopRatedMovies = () =>
TMBD_INITIAL_MOVIES_URL.get(ENDPOINTS.TOP_RATED_MOVIES);

const getUpcomingMovies = () =>
TMBD_INITIAL_MOVIES_URL.get(ENDPOINTS.UPCOMING_MOVIES);

const getPoster = (path) => `${TMDB_IMAGE_URL}/original${path}`;

const getMovieDetailsById = (movieId, append_to_response = "") =>
TMBD_INITIAL_MOVIES_URL.get(`${ENDPOINTS.MOVIE}/${movieId}`, append_to_response ? { params: { append_to_response } } :null);

const getMovieProviders = (movieId)=>
TMBD_INITIAL_MOVIES_URL.get(`${ENDPOINTS.MOVIE}/${movieId}/watch/providers`);

const defineTrailerURL = (json)=>
`${YT_BASE_URL}${findTrailerKey(json)}`;

function findTrailerKey(json)
{
  for(let i=0; i<json.length; i++)
  {
    if (json[i].type === "Trailer")
    {
      return json[i].key;
    }
  }
  return null;
}

const getSearchedMovies = (query)=>
axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);

const getRequestToken =()=>
axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`);

const validateUserLogin =  (username, password, requestToken)=>
 axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`,{
  username: username,
  password: password,
  request_token: requestToken
});

const getSessionId =(requestToken)=>
axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,{
  request_token: requestToken
});

const logout =(sessionID)=>
axios.delete(`https://api.themoviedb.org/3/authentication/session?api_key=${TMDB_API_KEY}`,
  {data:
    {
      session_id: sessionID
    }
});


const getRatedList=(sessionId)=>
axios.get(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/rated/movies?api_key=${TMDB_API_KEY}&session_id=${sessionId}&sort_by=created_at.asc`);

const addToRated =(sessionId, movId, rateValue)=>
axios.post(`https://api.themoviedb.org/3/movie/${movId}/rating?api_key=${TMDB_API_KEY}&session_id=${sessionId}`,
{
  value: rateValue
});

const removeFromRated =(sessionId, movId)=>
axios.delete(`https://api.themoviedb.org/3/movie/${movId}/rating?api_key=${TMDB_API_KEY}&session_id=${sessionId}`);


const addOrRemoveFromFav=(sessionId,movieId,whatToDo)=>
axios.post(`https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${TMDB_API_KEY}&session_id=${sessionId}`,
{
  media_type: 'movie',
  media_id: movieId,
  favorite: whatToDo
});

const getFavs=(sessionId)=>
axios.get(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${TMDB_API_KEY}&session_id=${sessionId}&sort_by=created_at.asc`)

export { getPoster, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies,
        getMovieDetailsById,getMovieProviders, defineTrailerURL,
        getSearchedMovies, 
        getRequestToken, validateUserLogin, getSessionId,logout,
        getRatedList, addToRated,removeFromRated,
        addOrRemoveFromFav,getFavs};
