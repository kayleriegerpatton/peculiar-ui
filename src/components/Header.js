import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';

import { styles } from "../styles";
import { useAuth } from "../contexts/AppProvider";
import { Stack } from "@mui/material";
import { ReactComponent as LogoIcon } from '../peculiar-bird-icon.svg'

const loggedInPages = [
  { label: "Create", path: "create" },
  { label: "Dashboard", path: "dashboard" }, // edit links will be on the dashboard
];

const loggedOutPages = [
  { label: "Sign Up", path: "signup" },
  { label: "Log In", path: "login" }
]

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const { isLoggedIn, user, setUser, setIsLoggedIn } = useAuth();
  const mobile = useMediaQuery({ query: "(max-width: 1023px" });

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path) => {
    if (path === "dashboard") {
      navigate(`${user.id}/${path}`, { replace: true })
    } else {
      navigate(path, { replace: true });
    }
    setAnchorElNav(null);
  };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  //  const handleOpenUserMenu = (event) => {
  //     setAnchorElUser(event.currentTarget);
  //   };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser();
    setIsLoggedIn(false);

    navigate("/", { replace: true });
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "var(--gold-fusion)" }}
    >
      <Toolbar disableGutters sx={{ display: "flex" }}>
        {/* Title on desktop */}
        {!mobile &&
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.5}
            component="a"
            onClick={() => handleNavigation("/")}
            sx={{
              ml: 2,
              cursor: "pointer",
            }}>
            <LogoIcon fill='white' width="5rem" height="5rem" />
            <div>
              <Typography
                fontFamily={'Amatic SC'}
                fontWeight={'700'}
                fontSize="3.125rem"
                color='white'
              >
                The Peculiar Project
              </Typography>
            </div>
          </Stack>
        }


        {/* nav links on larger screen sizes */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            mr: 2
          }}
        >
          <Button
            onClick={() => handleNavigation("about")}
            sx={styles.navLink}
            component="a"
          >
            About
          </Button>

          {/* LOGGED IN ------------------------------- */}
          {isLoggedIn &&
            (<>
              {loggedInPages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => handleNavigation(page.path)}
                  sx={styles.navLink}
                  component="a"
                >
                  {page.label}
                </Button>
              ))}

              <Button
                onClick={handleLogout}
                sx={styles.navLink}
              >
                Logout
              </Button>
            </>)}

          {/* LOGGED OUT ------------------------------- */}
          {!isLoggedIn && (<>
            {loggedOutPages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigation(page.path)}
                sx={styles.navLink}
                component="a"
              >
                {page.label}
              </Button>
            ))}</>)}



        </Box>

        {/* MOBILE VIEWPORTS ------------------------------------------------------------*/}
        {/* Title on small-medium screen sizes */}
        <Typography
          variant="h4"
          noWrap
          component="button"
          onClick={() => handleNavigation("/")}
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "center",
            fontFamily: "Amatic SC",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
            position: "absolute",
            left: 0,
            right: 0,
            border: "none",
            backgroundColor: "var(--gold-fusion)",
            cursor: "pointer",
          }}
        >
          The Peculiar Project
        </Typography>
        {/* Right-aligned burger menu */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              // backgroundColor: "--var(gold-fusion)"
            }}
          >
            <MenuItem
              onClick={() => handleNavigation("about")}
            // sx={styles.navLink}
            >
              <Typography
                sx={{
                  fontFamily: "Libre Franklin",
                  fontSize: "1.2rem",
                  component: "a"
                }}
              >
                About
              </Typography>
            </MenuItem>
            {/* LOGGED IN ------------------------------- */}
            {isLoggedIn &&
              (<div>
                {loggedInPages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleNavigation(page.path)}
                    component="a"
                  >
                    <Typography
                      sx={{
                        fontFamily: "Libre Franklin",
                        fontSize: "1.2rem",
                      }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleLogout}
                  sx={{ paddingRight: "3rem" }}
                  component="button"

                >
                  <Typography
                    sx={{
                      fontFamily: "Libre Franklin",
                      fontSize: "1.2rem",
                    }}
                  >
                    logout
                  </Typography>
                </MenuItem>
              </div>)}

            {/* LOGGED OUT ------------------------------- */}
            {!isLoggedIn &&
              (<div>
                {loggedOutPages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => handleNavigation(page.path)}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Libre Franklin",
                        fontSize: "1.2rem",
                      }}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </div>)}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
