import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import { Navigate } from "react-router-dom";

function App() {
  const isAuthenticated = false;
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomeScreen /> : <Navigate to="/login" />}
        />
        {!isAuthenticated && <Route path="/login" element={<LoginScreen />} />}
      </Routes>
    </div>
  );
}

export default App;
