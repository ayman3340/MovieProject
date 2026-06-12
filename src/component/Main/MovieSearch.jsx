import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SearchTodayFetch } from "../../features/movies/MovieFetchThnk";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import ReactPaginate from "react-paginate";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router";

function MovieList() {
  const MovieListArray = useSelector((state) => state.movieReducerTool);

  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Number(MovieListArray?.PaginationMovieSearch) || 0;
  // let searchChange = searchParams.get("search");
  const handlePageClick = (event) => {
    const selected0Based = event.selected;
    setCurrentPage(selected0Based);
    dispatch(
      SearchTodayFetch({
        Movie: "search/movie",
        page: selected0Based + 1,
        query: `query=${searchParams.get("search")}`,
      })
    );
  };

  return (
    <Container sx={{ mt: "50px" }}>
      {MovieListArray?.MovieSearch?.results?.length === 0 ? (
        <Box justifyItems={"start"} height={"auto"}>
          <Typography
            variant="h3"
            color="default"
            fontWeight={"900"}
            textAlign={"start"}
          >
            {String("SEARCH RESULTS").toUpperCase()}
          </Typography>
          <Typography
            variant="h5"
            color="default"
            fontWeight={"800"}
            marginBottom={"2rem"}
            marginTop={"3rem"}
            textAlign={"center"}
          >
            .No movies found
          </Typography>
        </Box>
      ) : (
        <Container>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {MovieListArray?.MovieSearch?.results?.map((movie) => (
              <Grid
                key={movie?.id}
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link
                  to={`/DataDetail/${movie?.id}`}
                  style={{ all: "unset", width: "100%", display: "flex", justifyContent: "center" }}
                >
                  <Card
                    sx={{
                      maxWidth: 410,
                      width: "90%",
                      height: "100%",
                      boxShadow: "none",
                      background: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardActionArea
                      sx={{
                        width: "100%",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        ":hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0px 12px 24px rgba(153, 0, 255, 0.4)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          movie?.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                            : "https://placehold.co/200x300?text=no+image"
                        }
                        alt={movie?.title}
                      />
                    </CardActionArea>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontWeight: 600,
                        my: ".7rem",
                        width: "100%",
                        textAlign: "center",
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        lineHeight: 1.3,
                      }}
                    >
                      {movie?.title}
                    </Typography>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>

          {pageCount > 1 && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageCount={pageCount}
              forcePage={currentPage} // 0-based
              previousLabel="Previous"
              // optional: className props so you can style .pagination etc.
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              activeClassName="activePage"
              renderOnZeroPageCount={null}
            />
          )}
        </Container>
      )}

    </Container>
  );
}

export default MovieList;
