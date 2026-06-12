import React, { useEffect } from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Them from "../../Them";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import {  useDispatch } from "react-redux";
import { SearchTodayFetch } from "../../features/movies/MovieFetchThnk";
import { createSearchParams, useSearchParams } from "react-router";
import { useNavigate } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid gray",
  backgroundColor: alpha(theme.palette.common.white, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: "1px solid #ba15e4ff",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header() {
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [inputValue, inputValueSet] = React.useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      SearchTodayFetch({
        Movie: `search/movie`,
        page: 1,
        query: `query=${inputValue}`,
      })
    );
    setSearchParams((searchParams) => {
      searchParams.get("search");
      return searchParams;
    });

    if (inputValue.length >= 1) {
      navigate(
        {
          pathname: "search",
          search: `?${createSearchParams({
            search: inputValue,
          })}`,
        },
        {
        }
      );
    } else {
      if (searchParams.has("search")) {
        searchParams.delete("search");
        setSearchParams(searchParams);
      }
    }
  }, [inputValue]);

  return (
    <AppBar
      sx={{
        background: "rgba(0, 0, 0, 0)",
        boxShadow:
          " rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        position: { xs: "fixed", sm: "static" },
      }}
    >
      <Container sx={{ "&.MuiContainer-root": { padding: 0 } }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="default"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu} >
                <Typography sx={{ textAlign: "center",width:"100%" }}>
                  <NavLink
                  
                    className={({ isActive }) =>
                      isActive ? "my-link " : "my-linkHover"
                    }
                    style={{ all: "unset",display:"block",width:"100%" }}
                    to="/"
                  >
                    HOME 
                  </NavLink>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography sx={{ textAlign: "center" }}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "my-link " : "my-linkHover"
                    }
                    style={{ all: "unset",display:"block",width:"100%" }}
                    to="/trending"
                  >
                    TRENDING
                  </NavLink>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? "my-link " : "my-linkHover"
              }
              to="/"
              onClick={handleCloseNavMenu}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                fontSize: "1.4rem",
                fontWeight: "600",

                padding: "13px",
                marginRight: "2rem",
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "2px solid #e45015ff",
                  background: "none",
                },
              }}
            >
              HOME
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "my-link " : "my-linkHover"
              }
              to="/trending"
              onClick={handleCloseNavMenu}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
                fontSize: "1.4rem",
                fontWeight: "600",
                padding: "13px",
                marginRight: "2rem",
                cursor: "pointer",
                "&:hover": {
                  borderBottom: "2px solid #e45015ff",
                },
              }}
            >
              TRENDING
            </NavLink>
          </Box>

          <Search
            sx={{
              ".MuiInputBase-root": {
                width: "260px",
              },
              width: { xs: "50%", sm: "50%", md: "260px" },
              borderRadius: "1rem",
              m: "8px",
            }}
          >
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ textAlign: "end" }}
              value={inputValue}
              // autoFocus="autoFocus"
              onChange={(e) => inputValueSet(e.target.value)}
            />
          </Search>
          <Them></Them>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
