import { useLayoutEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";

const hadAdminSession = () => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("Freshmart_user");

  if (!token || !savedUser) return false;

  try {
    return JSON.parse(savedUser).role === "admin";
  } catch {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return hadAdminSession() ? (
    children
  ) : (
    <Navigate to={"/login"} replace={{ from: location }} />
  );
};

const PublicOnlyRoute = ({ children }) =>
  hadAdminSession() ? <Navigate to={"/dashboard"} replace /> : children;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
    </Routes>
  );
};

export default App;
