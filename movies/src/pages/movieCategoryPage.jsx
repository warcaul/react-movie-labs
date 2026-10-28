import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getMovieList } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";

// One page for every TMDB movie list. The route decides what it shows:
//   title  - heading at the top of the page
//   path   - TMDB endpoint, e.g. "/movie/popular"
//   action - icon(s) to show on each movie card
const MovieCategoryPage = ({ title, path, action }) => {
    const [page, setPage] = useState(1);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["movies", { path: path, page: page }],
        queryFn: getMovieList,
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
            title={title}
            movies={movies}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            action={action}
        />
    );
};

export default MovieCategoryPage;