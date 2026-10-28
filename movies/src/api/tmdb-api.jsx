const apiKey = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

// Shared helper: every API call below goes through here.
// It adds the API key, checks the response, and throws a readable
// error so react-query's isError / error.message work everywhere.
const fetchFromTMDB = (path, params = "") => {
  return fetch(`${baseUrl}${path}?api_key=${apiKey}${params}`).then(
    (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    }
  );
};

// One function for every paged movie list (discover, popular, top rated, ...).
// queryKey looks like: ["movies", { path: "/movie/popular", page: 2 }]
export const getMovieList = ({ queryKey }) => {
  const [, { path, page }] = queryKey;
  return fetchFromTMDB(path, `&language=en-US&page=${page}`);
};

export const getMovie = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchFromTMDB(`/movie/${id}`);
};

export const getGenres = () => {
  return fetchFromTMDB("/genre/movie/list", "&language=en-US");
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchFromTMDB(`/movie/${id}/images`);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchFromTMDB(`/movie/${id}/reviews`);
};

export const getMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchFromTMDB(`/movie/${id}/credits`);
};

export const getPerson = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchFromTMDB(`/person/${id}`);
};

export const getPersonMovieCredits = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetchFromTMDB(`/person/${id}/movie_credits`);
};

export const searchMovies = ({ queryKey }) => {
  const [, queryPart] = queryKey;
  const { query } = queryPart;
  return fetchFromTMDB(
    "/search/movie",
    `&language=en-US&include_adult=false&page=1&query=${encodeURIComponent(query)}`
  );
};