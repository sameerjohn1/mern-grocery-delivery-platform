import { lazy, Suspense } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AppSkeleton } from "./components/Skeletons/AdminSkeletons";

const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home/Home"));
const ProductList = lazy(() => import("./pages/ProductList/ProductList"));
const ItemList = lazy(() => import("./pages/ItemListPage/ItemList"));
const Orders = lazy(() => import("./pages/Orders/Orders"));
const AddItem = lazy(() => import("./pages/AddItems/AddItem"));
const AddProduct = lazy(() => import("./pages/AddProduct/AddProduct"));

const hadAdminSession = () => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("GreenCart_user");

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
    <Suspense fallback={<AppSkeleton />}>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={hadAdminSession() ? "/dashboard" : "/login"}
              replace
            />
          }
        />
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Home />} />
          <Route path="/add-items" element={<AddItem />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/item-list" element={<ItemList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product-list" element={<ProductList />} />
        </Route>

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
    </Suspense>
  );
};

export default App;
