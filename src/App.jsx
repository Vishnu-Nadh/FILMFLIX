import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialMovieList } from "./store/movie-slice/movie-actions";

import {
  WatchList,
  HomeScreen,
  Account,
  Welcome,
  AuthScreen,
  NotFound,
  PlayMovie,
} from "./pages";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialMovieList());
  }, []);

  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/account" element={<Account />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/watch/:id" element={<PlayMovie />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
