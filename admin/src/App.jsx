import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import AddProduct from "./pages/AddProduct/AddProduct";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductList/ProductList";
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
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product-list"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-hookah"
        element={<Navigate to="/add-product" replace />}
      />
      <Route
        path="/hookah-list"
        element={<Navigate to="/product-list" replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
// 6:20:50
