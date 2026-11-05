import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import GreenCart from "../../assets/greenCart.png";
import AuthStageIndicator from "./AuthStageIndicator";
import { forgotPassword, resetPassword } from "../../api/api";
import { resetPasswordStyles as s } from "../../assets/dummyStyles";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
  const toastTimer = useRef();
  const redirectTimer = useRef();

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
      window.clearTimeout(redirectTimer.current);
    },
    [],
  );

  const showToast = (type, message) => {
    window.clearTimeout(toastTimer.current);
    setToast({ show: true, type, message });
    toastTimer.current = window.setTimeout(
      () => setToast((current) => ({ ...current, show: false })),
      3200,
    );
  };

  const handleRequestCode = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    try {
      setRequestLoading(true);
      await forgotPassword({ email: normalizedEmail });
      setEmail(normalizedEmail);
      setOtp("");
      showToast(
        "success",
        "Request received. This screen can't confirm whether reset instructions were sent.",
      );
    } catch {
      showToast("error", "We couldn't process this request. Please try again.");
    } finally {
      setRequestLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      showToast("error", "Enter the six-digit code from your email.");
      return;
    }
    if (password.length < 6) {
      showToast("error", "Your new password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      showToast("error", "Your passwords don’t match. Check both fields and try again.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await resetPassword({ email, otp, password });
      setPassword("");
      setConfirmPassword("");
      setOtp("");
      showToast("success", data.message || "Your password was reset successfully.");
      redirectTimer.current = window.setTimeout(
        () => navigate("/login", { state: { email } }),
        1100,
      );
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "We couldn't reset your password. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={s.main}>
      <div className={s.background} aria-hidden="true">
        <div className={s.gridPattern} />
        <div className={s.glow} />
        <div className={s.bottomGlow} />
      </div>

      <div
        className={`${s.toast} ${toast.show ? s.toastVisible : s.toastHidden} ${
          toast.type === "success" ? s.toastSuccess : s.toastError
        }`}
        role={toast.type === "success" ? "status" : "alert"}
        aria-live={toast.type === "success" ? "polite" : "assertive"}
      >
        {toast.message}
      </div>

      <section className={s.shell} aria-labelledby="reset-heading">
        <Link to="/" className={s.brand}>
          <img src={GreenCart} alt="" className={s.brandLogo} />
          <span className={s.brandName}>GreenCart</span>
        </Link>

        <div className={s.card}>
          <div className={s.cardAccent} aria-hidden="true" />
          <div className={s.iconBadge}>
            <ShieldCheck className={s.heroIcon} aria-hidden="true" />
          </div>
          <p className={s.eyebrow}>Secure your account</p>
          <h1 id="reset-heading" className={s.heading}>
            Create a new password
          </h1>
          <p className={s.subtext}>
            {email
              ? "Enter the one-time code if one was sent to this address, then choose a new password."
              : "Request a one-time code for your account, then choose a new password."}
          </p>
          <AuthStageIndicator
            steps={["Request code", "New password"]}
            activeStep={email ? 2 : 1}
            label="Password recovery progress"
            styles={s}
          />

          {!email ? (
            <form onSubmit={handleRequestCode} className={s.form}>
              <label className={s.label} htmlFor="reset-email">
                Account email
              </label>
              <div className={s.inputWrapper}>
                <Mail className={s.inputIcon} aria-hidden="true" />
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={s.inputField}
                />
              </div>
              <p className={s.helperText}>
                You arrived without your email address. Request a fresh reset code to continue.
              </p>
              <button
                type="submit"
                disabled={requestLoading}
                className={s.submitButton}
              >
                {requestLoading ? (
                  <LoaderCircle className={s.buttonIcon} aria-hidden="true" />
                ) : (
                  <ArrowRight className={s.buttonIcon} aria-hidden="true" />
                )}
                {requestLoading ? "Sending code…" : "Send reset code"}
              </button>
            </form>
          ) : (
            <>
              <div className={s.emailPanel}>
                <span className={s.emailLabel}>Reset code for</span>
                <span className={s.emailValue}>{email}</span>
                <Link to="/forgot-password" className={s.changeEmailButton}>
                  Change
                </Link>
              </div>

              <form onSubmit={handleResetPassword} className={s.form}>
                <label className={s.label} htmlFor="reset-code">
                  Six-digit code
                </label>
                <input
                  id="reset-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="000000"
                  className={s.otpInput}
                  aria-describedby="reset-code-help"
                />
                <p id="reset-code-help" className={s.helperText}>
                  If you received a code, it is valid for 10 minutes.
                </p>

                <label className={s.label} htmlFor="new-password">
                  New password
                </label>
                <div className={s.inputWrapper}>
                  <LockKeyhole className={s.inputIcon} aria-hidden="true" />
                  <input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 6 characters"
                    className={s.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className={s.toggleButton}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className={s.toggleIcon} aria-hidden="true" />
                    ) : (
                      <Eye className={s.toggleIcon} aria-hidden="true" />
                    )}
                  </button>
                </div>

                <label className={s.label} htmlFor="confirm-password">
                  Confirm new password
                </label>
                <div className={s.inputWrapper}>
                  <LockKeyhole className={s.inputIcon} aria-hidden="true" />
                  <input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter your password"
                    className={s.inputField}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className={s.toggleButton}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className={s.toggleIcon} aria-hidden="true" />
                    ) : (
                      <Eye className={s.toggleIcon} aria-hidden="true" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={s.submitButton}
                >
                  {loading ? (
                    <LoaderCircle className={s.buttonIcon} aria-hidden="true" />
                  ) : (
                    <ArrowRight className={s.buttonIcon} aria-hidden="true" />
                  )}
                  {loading ? "Updating password…" : "Reset password"}
                </button>
              </form>
            </>
          )}

          <Link to="/login" className={s.backLink}>
            <ArrowLeft className={s.backIcon} aria-hidden="true" />
            Back to login
          </Link>
        </div>
        <p className={s.footerNote}>Keep your password private and secure.</p>
      </section>
    </main>
  );
};

export default ResetPassword;
