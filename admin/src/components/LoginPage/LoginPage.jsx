import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";
import freshmartLogo from "../../assets/freshmart-logo.svg";
import axios from "axios";
import { adminLoginStyles as s } from "../../assets/dummyStyles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
      );
      if (data.success) {
        if (data.user?.role !== "admin") {
          setError("This account does not have admin access.");
          return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("freshmart_user", JSON.stringify(data.user));
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={s.mainContainer}>
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className={s.glow1}></div>
        <div className={s.glow2}></div>
        <div className={s.glow3}></div>
      </div>

      <div className={s.contentWrapper}>
        <div className={s.brandHeader}>
          <div className={s.brandInner}>
            <div className={s.logoWrapper}>
              <img
                src={freshmartLogo}
                alt="FreshMart"
                className={s.logoImage}
              />
            </div>
            <div className={s.brandText}>
              <p className={s.adminLabel}>Admin Portal</p>
              <h1 className={s.brandTitle}>FreshMart</h1>
            </div>
          </div>
        </div>

        <div className={s.card}>
          <div className={s.cardTopLine}></div>

          <form onSubmit={hanldeSubmit} className={s.form} noValidate>
            {error && (
              <div className={s.errorContainer} role="alert">
                <span className={s.errorDot}></span>
                <span>{error}</span>
              </div>
            )}

            <div className={s.fieldGroup}>
              <label htmlFor="email" className={s.fieldLabel}>
                Email Address
              </label>
              <div className={s.fieldWrapper}>
                <div className={s.fieldGlow}></div>
                <div className={s.fieldInputContainer}>
                  <Mail className={s.fieldIcon} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@freshmart.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={s.fieldInput}
                  />
                </div>
              </div>
            </div>

            <div className={s.fieldGroup}>
              <label htmlFor="password" className={s.fieldLabel}>
                Password
              </label>
              <div className={s.fieldWrapper}>
                <div className={s.fieldGlow}></div>
                <div className={s.fieldInputContainer}>
                  <Lock className={s.fieldIcon} />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={s.fieldInputPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className={s.toggleButton}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className={s.toggleIcon} />
                    ) : (
                      <Eye className={s.toggleIcon} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={s.submitButton}
            >
              <span className={s.submitShine}></span>
              <span className={s.submitInner}>
                {isLoading ? (
                  <span className={s.spinner}></span>
                ) : (
                  <LogIn className={s.submitIcon} />
                )}
                {isLoading ? "Signing in..." : "Sign In"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
