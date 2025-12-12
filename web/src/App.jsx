import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminPage from "./pages/admin/AdminPage.jsx";
import PlayerPage from "./pages/player/PlayerPage.jsx";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Box
        sx={{
          py: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Routes>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/" element={<PlayerPage />} />
            {/* <Route path="/" element={<Player />} /> */}
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
