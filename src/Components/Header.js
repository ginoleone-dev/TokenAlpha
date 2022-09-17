import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

import { useState } from "react";

const pages = ["About", "Contact"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(90deg, rgba(32,32,32,1) 0%, rgba(51,53,51,1) 100%)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          background: "transparent",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            background: "transparent",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex" },
              fontFamily: "monospace",
              fontWeight: 800,
              letterSpacing: ".3rem",
              textDecoration: "none",
              fontSize: { xs: "1rem", sm: "1.3em" },
            }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "#FFEE32" }}>
              CRYPTOSTATS
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color={"white"}>
                    <Link to={`/${page}`}>{page}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: "end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "#FFEE32",
                  display: "block",
                  fontSize: { xs: "13px", md: "16px" },
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "#FFEE32" }}
                  to={`/${page}`}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
