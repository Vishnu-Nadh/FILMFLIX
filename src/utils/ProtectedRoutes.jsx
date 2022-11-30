import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setInitialUserWatchList } from "../store/movie-slice/movie-actions";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user) {
      dispatch(setInitialUserWatchList(user.uid));
    }
  }, []);

  return user ? <Outlet /> : <Navigate to="/welcome" />;
};

export default ProtectedRoutes;
