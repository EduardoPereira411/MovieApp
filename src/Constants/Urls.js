const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";
const TMDB_API_KEY = "";
const YT_BASE_URL = 'https://www.youtube.com/watch?v=';

const ENDPOINTS = {
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  UPCOMING_MOVIES: "/movie/upcoming",
  TOP_RATED_MOVIES: "/movie/top_rated",
  GENRES: "/genre/movie/list",
  MOVIE: "/movie",
  SEARCH: "/search/movie"
};

const APPEND_TO_RESPONSE = {
  TRAILER: `videos`,
  PROVIDERS: `watch/providers`,
};

export { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_URL, ENDPOINTS, APPEND_TO_RESPONSE, YT_BASE_URL };
