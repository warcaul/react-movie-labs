import { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

const SearchMoviesPage = () => {
    // The search term lives in the URL (e.g. /search?query=batman),
    // so the back button and page links keep the search.
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const [text, setText] = useState(query);

    const { data, error, isPending, isError } = useQuery({
        queryKey: ["search", { query: query }],
        queryFn: searchMovies,
        enabled: query.length > 0, // don't call TMDB until there is something to search
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchParams({ query: text.trim() });
    };

    let results;
    if (query.length === 0) {
        results = (
            <Typography variant="h6" sx={{ padding: 2 }}>
                Type a movie title above to search all of TMDB.
            </Typography>
        );
    } else if (isPending) {
        results = <Spinner />;
    } else if (isError) {
        results = <h1>{error.message}</h1>;
    } else if (data.results.length === 0) {
        results = (
            <Typography variant="h6" sx={{ padding: 2 }}>
                No movies found for "{query}".
            </Typography>
        );
    } else {
        results = (
            <PageTemplate
                title={`Results for "${query}"`}
                movies={data.results}
                action={(movie) => {
                    return <AddToFavoritesIcon movie={movie} />;
                }}
            />
        );
    }

    return (
        <>
            <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", gap: 2, padding: 2, margin: "20px" }}
            >
                <TextField
                    label="Search movies"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <Button type="submit" variant="contained" startIcon={<SearchIcon />}>
                    Search
                </Button>
            </Paper>
            {results}
        </>
    );
};

export default SearchMoviesPage;