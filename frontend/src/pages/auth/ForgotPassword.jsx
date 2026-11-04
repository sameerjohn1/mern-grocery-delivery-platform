import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";
import GreenCart from "../../assets/greenCart.png";
import AuthStageIndicator from "./AuthStageIndicator";
import { forgotPassword } from "../../api/api";
import { forgotPasswordStyles as s } from "../../assets/dummyStyles";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });
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

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    try {
      setLoading(true);
      await forgotPassword({ email: normalizedEmail });
      showToast(
        "success",
        "Request received. This screen can't confirm whether reset instructions were sent.",
      );
      redirectTimer.current = window.setTimeout(
        () =>
          navigate("/reset-password", { state: { email: normalizedEmail } }),
        1100,
      );
    } catch {
      showToast("error", "We couldn't process this request. Please try again.");
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

      <section className={s.shell} aria-labelledby="forgot-heading">
        <Link to="/" className={s.brand}>
          <img src={GreenCart} alt="" className={s.brandLogo} />
          <span className={s.brandName}>GreenCart</span>
        </Link>

        <div className={s.card}>
          <div className={s.cardAccent} aria-hidden="true" />
          <div className={s.iconBadge}>
            <ShieldCheck className={s.heroIcon} aria-hidden="true" />
          </div>
          <p className={s.eyebrow}>Account recovery</p>
          <h1 id="forgot-heading" className={s.heading}>
            Forgot your password?
          </h1>
          <p className={s.subtext}>
            Enter your email to request a one-time code. We’ll show the same
            confirmation either way.
          </p>
          <AuthStageIndicator
            steps={["Request code", "New password"]}
            activeStep={1}
            label="Password recovery progress"
            styles={s}
          />

          <form onSubmit={handleForgotPassword} className={s.form}>
            <label className={s.label} htmlFor="recovery-email">
              Email address
            </label>
            <div className={s.inputWrapper}>
              <Mail className={s.inputIcon} aria-hidden="true" />
              <input
                id="recovery-email"
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
              If an account exists, its reset code expires 10 minutes after
              delivery.
            </p>
            <button type="submit" disabled={loading} className={s.submitButton}>
              {loading ? (
                <LoaderCircle className={s.buttonIcon} aria-hidden="true" />
              ) : (
                <ArrowRight className={s.buttonIcon} aria-hidden="true" />
              )}
              {loading ? "Sending code…" : "Send reset code"}
            </button>
          </form>

          <Link to="/login" className={s.backLink}>
            <ArrowLeft className={s.backIcon} aria-hidden="true" />
            Back to login
          </Link>
        </div>
        <p className={s.footerNote}>
          Your account and information stay protected.
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;
