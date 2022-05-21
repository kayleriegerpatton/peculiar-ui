import { Box, Stack } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { LandingPage } from "../pages/LandingPage";
import { CreatePage } from "../pages/CreatePage";
import { EditPage } from "../pages/EditPage";
// import authProvider

// * AppRouter controls URL and rendered pages/components
export const AppRouter = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <Navbar />

      <Box sx={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit" element={<EditPage />} />
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Box>

      <Footer />
    </Stack>
  );
};
