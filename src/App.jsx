import "react-multi-carousel/lib/styles.css";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { BrowserRouter, Link, Router, Routes, Route } from "react-router-dom";
import Home from "./component/Main/Home";
import Layout from "./component/Layout";
import Trending from "./component/Main/Trending";

import DataDetail from "./component/Main/MovieDetail";
import MovieList from "./component/Main/MovieSearch";
function App() {
  let theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <BrowserRouter basename="/MovieProject">
      {/* Navigation */}

      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route index element={<Home />} />
            <Route path="/trending" element={<Trending></Trending>}></Route>
            <Route
              path="/DataDetail/:id"
              element={<DataDetail></DataDetail>}
            ></Route>
            {/* ########## */}
            <Route path="/search" element={<MovieList></MovieList>}></Route>
            {/* ########## */}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
