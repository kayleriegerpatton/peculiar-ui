import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./components/AppRouter";

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
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
