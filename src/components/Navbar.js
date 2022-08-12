import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styles } from "../styles";

const adminPages = [
  { label: "Create", path: "create" },
  { label: "Edit", path: "edit" },
];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
    setAnchorElNav(null);
  };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  //  const handleOpenUserMenu = (event) => {
  //     setAnchorElUser(event.currentTarget);
  //   };
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "var(--platinum)", mb: 5 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          {/* Title on desktop */}
          <Typography
            variant="h5"
            noWrap
            component="button"
            onClick={() => handleNavigation("/")}
            sx={{
              fontFamily: "Amatic SC",
              fontWeight: 700, //bold
              fontSize: "2.5rem",
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "var(--dark-liver)",
              textDecoration: "none",
              border: "none",
              backgroundColor: "var(--platinum)",
              cursor: "pointer",
            }}
          >
            The Peculiar Project
          </Typography>

          {/* nav links on medium+ screen sizes */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              component="a"
              className="skip-nav-link"
              sx={{
                ...styles.navLink,
                transform: "translateY(-170%)",
                transition: "transform 0.3s",
                "&:focus": {
                  transform: "translateY(0%)",
                  backgroundColor: "var(--lavender-blue)",
                  color: "var(--dark-liver)",
                },
              }}
              href="#page-container"
            >
              Skip Navigation
            </Button>
            {adminPages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigation(page.path)}
                sx={styles.navLink}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Title on medium screen sizes */}
          <Typography
            variant="h4"
            noWrap
            component="button"
            onClick={() => handleNavigation("/")}
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              justifyContent: "center",
              fontWeight: 700,
              color: "var(--dark-liver)",
              textDecoration: "none",
              position: "absolute",
              left: 0,
              right: 0,
              border: "none",
              backgroundColor: "var(--platinum)",
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
              sx={{ color: "var(--dark-liver)" }}
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
              }}
            >
              {adminPages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleNavigation(page.path)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Avatar dropdown menu */}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
