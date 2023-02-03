import { Box, Stack } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { LandingPage } from "../pages/LandingPage";
import { CreatePage } from "../pages/CreatePage";
import { CreateCharacterPage } from "../pages/CreateCharacterPage";
import { CreateLoopPage } from "../pages/CreateLoopPage";
import { CreatePeculiarityPage } from "../pages/CreatePeculiarityPage";
import { EditPage } from "../pages/EditPage";
import { SkipLink } from "./SkipLink";
import { useAuth } from "../contexts/AppProvider";
import { SignUpPage } from "../pages/SignUpPage";
import { LoginPage } from "../pages/LoginPage";
import { AboutPage } from "../pages/AboutPage";

// * AppRouter controls URL and rendered pages/components
// TODO: handle browser back button functionality; hash router?
export const AppRouter = () => {
  // const { isLoggedIn, user } = useAuth()
  const isLoggedIn = true

  const notMobile = useMediaQuery({ query: "(min-width: 900px" });
  return (
    <>
      {/* Don't activate skip link on small/medium viewports */}
      {notMobile && <SkipLink />}

      <Stack id={"page-container"} sx={{ minHeight: "100vh" }}>
        <Navbar component={"header"} />

        <Box component={'main'} id='main-content' tabIndex={"-1"} sx={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<LandingPage />} />
            {isLoggedIn && (
              <>
                <Route path="/create/character" element={<CreateCharacterPage />} />
                <Route path="/create/peculiarity" element={<CreatePeculiarityPage />} />
                <Route path="/create/loop" element={<CreateLoopPage />} />
                <Route path="/create" element={<CreatePage />} />

                <Route path="/edit" element={<EditPage />} />

              </>
            )}
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
          </Routes>
        </Box>

        <Footer component={"footer"} />
      </Stack>
    </>
  );
};
