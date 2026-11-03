import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import VerifyEmailPage from "./components/VerifyEmailPage/VerifyEmailPage";
import ProductPage from "./components/ProductPage/ProductPage";
import GreenCartPage from "./components/GreenCart.jsx/GreenCartPage";
import Home from "./pages/Home/Home";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    const root = document.documentElement;
    const previousBehaviour = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    root.style.scrollBehavior = previousBehaviour;
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/green-cart" element={<GreenCartPage />} />
      </Routes>
    </>
  );
};

export default App;
