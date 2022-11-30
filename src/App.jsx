import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./utils/ProtectedRoutes";

import {
  WatchList,
  HomeScreen,
  Account,
  Welcome,
  AuthScreen,
  NotFound,
  PlayMovie,
  GenreMovies,
} from "./pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/account" element={<Account />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/watch/:id" element={<PlayMovie />} />
          <Route path="/genre/:id" element={<GenreMovies />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
