import { Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import VerifyEmailPage from "./components/VerifyEmailPage/VerifyEmailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
    </Routes>
  );
};

export default App;
