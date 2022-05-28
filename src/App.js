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
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
};

// export const App = () => {
//   return (
//     <ApolloProvider client={client}>
//       <AppProvider>
//         <BrowserRouter>
//           <AppRouter />
//         </BrowserRouter>
//       </AppProvider>
//     </ApolloProvider>
//   );
// };
