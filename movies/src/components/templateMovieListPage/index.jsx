import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action, page, totalPages, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [yearFilter, setYearFilter] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter;
    })
    .filter((m) => {
      // Only filter once a full 4-digit year has been typed.
      if (yearFilter.length !== 4) return true;
      return m.release_date && m.release_date.slice(0, 4) >= yearFilter;
    });

  // Sort a copy so the original movies array is not changed.
  displayedMovies = [...displayedMovies].sort((a, b) => {
    if (sortBy === "rating") return b.vote_average - a.vote_average;
    if (sortBy === "popularity") return b.popularity - a.popularity;
    if (sortBy === "newest") return (b.release_date || "").localeCompare(a.release_date || "");
    if (sortBy === "oldest") return (a.release_date || "9999").localeCompare(b.release_date || "9999");
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0; // "none" keeps the order from TMDB
  });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "rating") setRatingFilter(value);
    else if (type === "year") setYearFilter(value);
    else if (type === "sort") setSortBy(value);
  };

  const handlePageChange = (e, value) => {
    onPageChange(value);
    window.scrollTo(0, 0); // go back to the top for the new page
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            yearFilter={yearFilter}
            sortBy={sortBy}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>

        {/* Only pages that pass onPageChange get page buttons. */}
        {onPageChange && (
          <Grid size={12} sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Grid>
        )}

      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
