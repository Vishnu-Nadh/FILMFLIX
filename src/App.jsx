import HomeScreen from "./pages/HomeScreen";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./pages/LoginScreen";
import { Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Welcome from "./pages/Welcome";

function App() {
  const isAuthenticated = false;
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <HomeScreen /> : <Navigate to="/welcome" />
          }
        />
        {!isAuthenticated && (
          <>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={<LoginScreen />} />
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
