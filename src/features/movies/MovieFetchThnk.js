import { createAsyncThunk } from "@reduxjs/toolkit";

export const TrendingTodayFetch = createAsyncThunk(
  "movie/TrendingToday",
  async (data) => {
    let endpoint = data.Movie;
    let extraParams = "";


    if (endpoint === "trending/movie/day") {
      endpoint = "discover/movie";
      extraParams = "&sort_by=popularity.desc";
    } else if (endpoint === "movie/now_playing") {
      endpoint = "discover/movie";
      extraParams = "&with_release_type=2|3&sort_by=popularity.desc";
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=${
        import.meta.env.VITE_KEY
      }${extraParams}&page=${data.page}&include_adult=false&certification_country=US&certification.lte=PG-13`
    );
    const dataFetch = await response.json();
    return dataFetch;
  }
);

export const SearchTodayFetch = createAsyncThunk(
  "movie/SearchTodayFetch",
  async (data) => {
    const response = await fetch(
`https://api.themoviedb.org/3/${data.Movie}?api_key=${
  import.meta.env.VITE_KEY
}&${data.query}&page=${data.page}&include_adult=false&certification_country=US&certification.lte=PG-13`
   );
    const dataFetch = await response.json();
    return dataFetch;
  }
);
