import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useState } from "react";

const PopularMoviesPage = () => {
    const [page, setPage] = useState(1);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["popular", { page: page }],
        queryFn: getPopularMovies,
        placeholderData: keepPreviousData, // keep showing the old page while the next one loads
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;
    // TMDB never returns more than 500 pages.
    const totalPages = Math.min(data.total_pages, 500);

    return (
        <PageTemplate
            title="Popular Movies"
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

export default PopularMoviesPage;