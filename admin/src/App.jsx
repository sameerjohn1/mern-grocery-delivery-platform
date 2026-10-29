import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import AddHookah from "./pages/AddHookah/AddHookah";
import Home from "./pages/Home/Home";
import HookahList from "./pages/HookahList/HookahList";
import ItemList from "./pages/ItemListPage/ItemList";
import Orders from "./pages/Orders/Orders";
import AddItem from "./pages/AddItems/AddItem";

const hadAdminSession = () => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("freshmart_user");

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
    <Navigate to="/login" replace state={{ from: location }} />
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

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-items"
        element={
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-item"
        element={
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/item-list"
        element={
          <ProtectedRoute>
            <ItemList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-hookah"
        element={
          <ProtectedRoute>
            <AddHookah />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hookah-list"
        element={
          <ProtectedRoute>
            <HookahList />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
