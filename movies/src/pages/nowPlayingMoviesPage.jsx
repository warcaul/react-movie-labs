import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useState } from "react";

const NowPlayingMoviesPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["nowPlaying", { page: page }],
        queryFn: getNowPlayingMovies,
        placeholderData: keepPreviousData,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;
    const totalPages = Math.min(data.total_pages, 500);

    return (
        <PageTemplate
            title="Now Playing in Cinemas"
            movies={movies}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            action={(movie) => {
                return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};

export default NowPlayingMoviesPage;