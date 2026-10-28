import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import SearchMoviesPage from "./pages/searchMoviesPage";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import MovieCategoryPage from "./pages/movieCategoryPage";
import AddToFavoritesIcon from "./components/cardIcons/addToFavorites";
import AddToPlaylistIcon from "./components/cardIcons/addToPlaylist";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

// Card icons used by the category pages below.
const favoriteAction = (movie) => <AddToFavoritesIcon movie={movie} />;
const playlistAction = (movie) => <AddToPlaylistIcon movie={movie} />

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<MovieCategoryPage key="discover" title="Discover Movies" path="/discover/movie" action={favoriteAction} />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
              <Route path="/actors/:id" element={<ActorDetailsPage />} />
              <Route path="/search" element={<SearchMoviesPage />} />
              <Route path="/movies/upcoming" element={<MovieCategoryPage key="upcoming" title="Upcoming Movies" path="/movie/upcoming" action={playlistAction} />} />
              <Route path="/movies/popular" element={<MovieCategoryPage key="popular" title="Popular Movies" path="/movie/popular" action={favoriteAction} />} />
              <Route path="/movies/top_rated" element={<MovieCategoryPage key="top_rated" title="Top Rated Movies" path="/movie/top_rated" action={favoriteAction} />} />
              <Route path="/movies/now_playing" element={<MovieCategoryPage key="now_playing" title="Now Playing in Cinemas" path="/movie/now_playing" action={favoriteAction} />} />

            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};



const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);