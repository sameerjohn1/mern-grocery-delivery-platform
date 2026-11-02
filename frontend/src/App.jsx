import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import VerifyEmailPage from "./components/VerifyEmailPage/VerifyEmailPage";
import ProductPage from "./components/ProductPage/ProductPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/products" element={<ProductPage />} />
    </Routes>
  );
};

export default App;
