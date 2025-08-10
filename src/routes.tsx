// routes/index.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/Home/Home";
import AdCreativeGenerator from "./pages/AdCreativeGenerator/AdCreativeGenerator";
import { useState, type JSX } from "react";

function PrivateRoute({
  children,
  isAuthenticated,
}: {
  children: JSX.Element;
  isAuthenticated: boolean;
}) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  // ✅ Global auth state here
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ad-creatives"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdCreativeGenerator setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
