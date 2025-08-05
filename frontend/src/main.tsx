import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import queryClient from "./config/queryClient";
import "./index.css"; // Tailwind styles
import { AppProvider } from "./context/AppContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
     <AppProvider>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools initialIsOpen={false}  />
    </BrowserRouter>
    </AppProvider>
  </QueryClientProvider>
);
