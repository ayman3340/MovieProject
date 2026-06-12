import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TrendingTodayFetch } from "../../features/movies/MovieFetchThnk";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import { Stack, Box } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

function Home() {
  const MovieListArray = useSelector((state) => state.movieReducerTool);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(TrendingTodayFetch({ Movie: "trending/movie/day", page: 1 }));
    dispatch(TrendingTodayFetch({ Movie: "movie/now_playing", page: 1 }));
  }, [dispatch]);

  const ButtonGroup = ({ next, previous }) => {
 
    return (
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <div className="carousel-button-group">
          <button className={"leftBtn"} onClick={() => previous()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="1.25rem"
              height="1.25rem"
            >
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
            </svg>
          </button>
          <button onClick={() => next()} className="rightBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="1.25rem"
              height="1.25rem"
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
            </svg>
          </button>
        </div>
      </Box>
    );
  };
  const ButtonGroupTow = ({ next, previous }) => {

    return (
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <div className="carousel-button-group">
          <button className={"leftBtnTow"} onClick={() => previous()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="1.25rem"
              height="1.25rem"
            >
              <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path>
            </svg>
          </button>
          <button onClick={() => next()} className="rightBtnTow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="1.25rem"
              height="1.25rem"
            >
              <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path>
            </svg>
          </button>
        </div>
      </Box>
    );
  };
  return (
    <Container>
      <Typography
        variant="h3"
        fontWeight={"900"}
        color="default"
        marginBottom={"2rem"}
        marginTop={"5rem"}
        component="h2"
      >
        TRENDING TODAY
      </Typography>

      <Stack position={"relative"}>
        <Carousel
          containerClass="container-padding-bottom"
          customButtonGroup={<ButtonGroup />}
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          pauseOnHover
          renderButtonGroupOutside
          arrows={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 2,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 2,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 2,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          showDots={false}
          sliderClass=""
          partialVisible={true}
        >
          {
          
          MovieListArray?.trending.length < 1 ? (
          <div>...loading</div>
        ) :

          MovieListArray?.trending?.length >= 1 &&
            MovieListArray?.trending &&
            MovieListArray?.trending.map((movie) => {
              return (
                <Link
                  to={`/DataDetail/${movie?.id}`}
                  key={movie?.id}
                  style={{ all: "unset" }}
                >
                  <Card
                    sx={{
                      maxWidth: 500,
                      boxShadow: "none",
                      background: "none",
                      position: "relative",
                      width: "100%",
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                    key={movie?.id}
                  >
                    <CardActionArea
                      className="container-left"
                      sx={{
                        width: "99%",
                        height: "20%",
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
                        height={"240px"}
                        image={
                          movie?.backdrop_path != null
                            ? `https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`
                            : "https://placehold.co/320x400?text=no+image"
                        }
                        alt={movie.title}
                      />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          position: "absolute",
                          bottom: "1rem",
                          left: "1%",
                          right: "1%",
                          fontWeight: "600",
                          color: "white",
                          zIndex: "3",
                          textAlign: "center",
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          lineHeight: 1.2,
                          textShadow: "0px 2px 6px rgba(0,0,0,0.9)",
                        }}
                      >
                        {movie.title}
                      </Typography>
                    </CardActionArea>
                  </Card>
                </Link>
              );
            })}
        </Carousel>

        {/* second Carousel */}
        <Typography
          variant="h3"
          fontWeight={"900"}
          color="default"
          marginBottom={"2rem"}
          marginTop={"3rem"}
          component="h2"
        >
          NOW IN THEATERS
        </Typography>

        <Carousel
          swipeable={true}
          arrows={false}
          centerMode={false}
          className="CarouselTow"
          containerClass="container-padding-bottom"
          customButtonGroup={<ButtonGroupTow />}
          dotListClass=""
          focusOnSelect={false}
          infinite={false}
          keyBoardControl
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 6,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 264,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 10,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 264,
              },
              items: 3,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
        >
          {
          MovieListArray?.nowPlaying.length < 1 ? (
          <div>...loading</div>
        ) :

          MovieListArray?.nowPlaying?.length >= 1 &&
            MovieListArray?.nowPlaying &&
            MovieListArray?.nowPlaying.map((movie) => {
              return (
                <Link
                  to={`/DataDetail/${movie?.id}`}
                  key={movie.id}
                  style={{ all: "unset" }}
                >
                  <Card
                    key={movie?.id}
                    sx={{
                      maxWidth: 345,
                      backgroundImage: "none",
                      boxShadow: "none",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="320"
                        image={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                            : "https://placehold.co/320x400?text=no+image"
                        }
                        alt={movie?.title}
                        sx={{
                          borderRadius: "10px",
                          transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          ":hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0px 12px 24px rgba(153, 0, 255, 0.4)",
                          },
                        }}
                      />
                    </CardActionArea>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        fontWeight: "600",
                        my: "1rem",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {movie?.title}
                    </Typography>
                  </Card>
                </Link>
              );
            })}
        </Carousel>
      </Stack>
    </Container>
  );
}

export default Home;
