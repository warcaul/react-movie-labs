import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Only show the first 10 actors (TMDB lists them in billing order).
  const cast = data.cast.slice(0, 10);

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ marginTop: 2 }}>
        Cast
      </Typography>

      <Stack direction="row" spacing={2} sx={{ overflowX: "auto", paddingY: 1 }}>
        {cast.map((actor) => (
          <Box key={actor.id} sx={{ textAlign: "center", minWidth: 100 }}>
            <Avatar
              alt={actor.name}
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185/${actor.profile_path}`
                  : undefined
              }
              sx={{ width: 80, height: 80, margin: "0 auto" }}
            />
            <Typography variant="body1">{actor.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {actor.character}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default MovieCast;