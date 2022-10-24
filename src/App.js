import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Components/About";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./ReduxContext/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  const client = new QueryClient();
  return (
    <Box sx={{ minHeight: "100%", backgroundColor: "#f7f4f3", width: "100%" }}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Header />
              <Routes>
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="/About" element={<About />} />
                </Route>
              </Routes>
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </Box>
  );
}

export default App;
