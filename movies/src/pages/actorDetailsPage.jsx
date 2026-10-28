import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import img from "../images/film-poster-placeholder.png";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ["person", { id: id }],
    queryFn: getPerson,
  });

  const { data: credits, isPending: creditsPending } = useQuery({
    queryKey: ["personMovies", { id: id }],
    queryFn: getPersonMovieCredits,
  });

  if (isPending || creditsPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Most popular films first, only the top 12.
  const movies = [...credits.cast]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid size={12}>
        <Paper sx={{ display: "flex", gap: 3, padding: 2, flexWrap: "wrap" }}>
          <Avatar
            variant="rounded"
            alt={actor.name}
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w300/${actor.profile_path}`
                : img
            }
            sx={{ width: 200, height: 300 }}
          />
          <div style={{ flex: "1 1 300px" }}>
            <Typography variant="h4" component="h2">
              {actor.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {actor.birthday && `Born: ${actor.birthday}`}
              {actor.place_of_birth && ` in ${actor.place_of_birth}`}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              {actor.biography || "No biography available."}
            </Typography>
          </div>
        </Paper>
      </Grid>

      <Grid size={12}>
        <Typography variant="h5" component="h3" sx={{ marginTop: 3 }}>
          Known for
        </Typography>
      </Grid>

      <Grid container size={12}>
        <MovieList
          movies={movies}
          action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />;
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;