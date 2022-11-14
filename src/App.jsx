import HomeScreen from "./pages/HomeScreen";
import { Route, Routes } from "react-router-dom";
import AuthScreen from "./pages/AuthScreen";
import Layout from "./components/layout/Layout";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Account from "./pages/Account";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
