import { BrowserRouter } from "react-router-dom";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AppRouter } from "./components/AppRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppProvider } from "./contexts/AppProvider";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#4c474bff",
    },
    secondary: {
      main: "#bfc1edff",
    },
  },
  breakpoints: {
    // min-width values
    values: {
      xs: 0, // mobile, 0-639px
      sm: 640, // tablet, 640-1023px
      md: 1024, // laptop, 1024-1199px
      lg: 1200, // desktop, 1200-1535px
      xl: 1536, // larger, 1536px+
    },
  },
  typography: {
    h4: {
      fontSize: "1.625rem",
      fontFamily: 'Amatic SC'
    }
  }
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AppProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AppProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};
