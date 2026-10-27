import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Tooltip from "@mui/material/Tooltip";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const isInMustWatch = context.mustWatch.includes(movie.id);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie);
  };

  if (isInMustWatch) {
    return (
      <Tooltip title="Already in Must Watch">
        <IconButton aria-label="in must watch">
          <PlaylistAddCheckIcon color="success" fontSize="large" />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Tooltip title="Add to Must Watch">
      <IconButton aria-label="add to playlist" onClick={handleAddToMustWatch}>
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
    </Tooltip>
  );
};

export default AddToPlaylistIcon;