import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { FavoritesProvider } from "./context/FavoritesProvider";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <ThemeProvider>
    <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </ThemeProvider>
    </StrictMode>
  </QueryClientProvider>
);
