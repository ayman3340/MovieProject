import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrendingTodayFetch } from "../../features/movies/MovieFetchThnk";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import {
  Stack,
  Grid,
  Box,
  Divider,
  useTheme,
  Rating,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import { Link, useParams } from "react-router-dom";

function DataDetail() {
  let params = useParams();
  const theme = useTheme();
  const dispatch = useDispatch();

  let baseTheme = createTheme();
  baseTheme = responsiveFontSizes(baseTheme);

  const movie = useSelector((state) => {
    return state.movieReducerTool.MovieDetails;
  });

  useEffect(() => {
    dispatch(
      TrendingTodayFetch({ Movie: `movie/${Number(params?.id)}`, page: 1 })
    );
    dispatch(
      TrendingTodayFetch({
        Movie: `movie/${Number(params?.id)}/images`,
        page: 1,
      })
    );
  }, [dispatch]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "4rem",
      }}
    >
      <Link
        to={`/DataDetail/${movie?.data?.id}`}
        key={movie?.data?.id}
        style={{
          all: "unset",
        }}
      >
        <Box
          sx={{
            boxShadow:
              "  rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            background: "#474747ff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
            mt: "10px",
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <ThemeProvider theme={theme}>
            <Card
              sx={{
                boxShadow: "none",
                background: "none",
                borderRadius: "20px",
                ml: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                
                width: { xs: "100%", sm: "100%", md: "50%" },
              }}
            >
              <CardActionArea
                      disableRipple={true}
                disableTouchRipple={true}
                sx={{ width: "70%" }}
        
              >
                <CardMedia
                  sx={{
                    borderRadius: "20px",
                    width: "100%",
                    my: "1rem",
                  }}
  
                  height="auto"
                  component="img"
                  image={
                    movie?.data?.poster_path != null
                      ? `https://image.tmdb.org/t/p/w500/${movie?.data?.poster_path}`
                      : "https://placehold.co/320x400?text=no+image"
                  }
                  alt={movie?.data?.title}
                />
              </CardActionArea>
            </Card>

            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
                flexDirection: "column",
                marginRight: { md: "0.8rem" },
                width: { xs: "100%", sm: "100%", md: "50%" },
              }}
            >
              <Box
                sx={{
                  m: "2rem",
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "start",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "white",
                    fontWeight: 900,
                    my: "1rem",
                  }}
                >
                  {movie?.data?.title}
                </Typography>

                <Rating
                  name="read-only"
                  value={Number(movie?.data?.vote_average / 2)}
                  readOnly
                />
              </Box>

              <Divider style={{ width: "100%", m: "1rem" }} />

              <Typography
                variant="p"
                component="div"
                sx={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "2.3rem",
                  marginLeft: "2.4rem",
                  mt: "1rem",
                }}
              >
                {movie?.data?.overview}
              </Typography>
              <Typography
                variant="p"
                component="div"
                sx={{
                  fontWeight: "600",
                  color: "white",
                  marginBottom: "2.3rem",
                  marginLeft: "2.4rem",
                }}
              >
                {movie?.data?.release_date}
              </Typography>
            </Box>
          </ThemeProvider>
        </Box>
      </Link>

      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "start",
          flexDirection: "column",
          gap: "1rem",
          mt: "2rem",
          display: { xs: "inline-block", sm: "inline-block", md: "flex" },
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: "900",
            color: "theme.pattern.text.primary",
            marginBottom: "2.3rem",
            marginLeft: "2.4rem",
          }}
        >
          Gallery
        </Typography>

        <Stack
          direction="row"
          sx={{
            flexDirection: { xs: "column", sm: "column", md: "row" },
            borderRadius: "20px",
          }}
        >
          {movie?.post?.backdrops
            ?.map((post) => {
              return post;
            })
            .slice(4, 7)
            .map((post,index) => {
              return (
                <CardActionArea
                key={post.id || index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    m: "5px",
                    backgroundColor: "rgba(255, 0, 0, 0)",
                    color: "rgba(255, 0, 0, 0)",
                  }}
                  disableRipple={true}
                  disableTouchRipple={true}
                >
                  <CardMedia
                    sx={{
                      maxHeight: "400px",
                      height: { xs: "90%", sm: "90%" },
                      width: { xs: "90%", sm: "90%", md: "100%" },
                      borderRadius: "20px",
                      marginBottom: "20px",
                    }}
                    component="img"
                    height={"240px"}
                    image={
                      post?.file_path != null
                        ? `https://image.tmdb.org/t/p/w500/${post?.file_path}`
                        : "https://placehold.co/320x400?text=no+image"
                    }
                    // alt={post?.file_path}
                    
                  />
                </CardActionArea>
              );
            })}
        </Stack>
      </Box>
    </Container>
  );
}

export default DataDetail;
