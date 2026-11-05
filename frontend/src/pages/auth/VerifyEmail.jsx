import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, ShieldCheck } from "lucide-react";
import GreenCart from "../../assets/greenCart.png";
import AuthStageIndicator from "./AuthStageIndicator";
import { resendOtp, verifyEmail } from "../../api/api";
import { verifyEmailStyles as s } from "../../assets/dummyStyles";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const returnToLogin = location.state?.returnTo === "/login";
  const signupOrigin = location.state?.returnTo === "/signup";
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
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

  const sendCode = async (address) => {
    const normalizedEmail = address.trim().toLowerCase();
    if (!normalizedEmail) {
      showToast("error", "Enter the email address you used to sign up.");
      return;
    }

    try {
      setResendLoading(true);
      const { data } = await resendOtp({ email: normalizedEmail });
      setEmail(normalizedEmail);
      setOtp("");
      showToast("success", data.message || "A new verification code was sent.");
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "We couldn't send a code. Please try again.",
      );
    } finally {
      setResendLoading(false);
    }
  };

  const handleRequestCode = (event) => {
    event.preventDefault();
    return sendCode(email);
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      showToast("error", "Enter the six-digit code from your email.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await verifyEmail({ email, otp });
      showToast("success", data.message || "Your email is verified. Taking you to login…");
      redirectTimer.current = window.setTimeout(
        () => navigate("/login", { state: { email } }),
        1100,
      );
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "We couldn't verify that code. Please try again.",
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

      <section className={s.shell} aria-labelledby="verify-heading">
        <Link to="/" className={s.brand}>
          <img src={GreenCart} alt="" className={s.brandLogo} />
          <span className={s.brandName}>GreenCart</span>
        </Link>

        <div className={s.card}>
          <div className={s.cardAccent} aria-hidden="true" />
          <div className={s.iconBadge}>
            <ShieldCheck className={s.heroIcon} aria-hidden="true" />
          </div>
          <p className={s.eyebrow}>Account security</p>
          <h1 id="verify-heading" className={s.heading}>
            Verify your email
          </h1>
          <p className={s.subtext}>
            A quick check keeps your GreenCart account safe and ready for your next order.
          </p>
          {signupOrigin && (
            <AuthStageIndicator
              steps={["Your details", "Verify email", "Sign in"]}
              activeStep={2}
              label="Account setup progress"
              styles={s}
            />
          )}

          {!email ? (
            <form onSubmit={handleRequestCode} className={s.form}>
              <label className={s.label} htmlFor="verification-email">
                Email address
              </label>
              <div className={s.inputWrapper}>
                <Mail className={s.inputIcon} aria-hidden="true" />
                <input
                  id="verification-email"
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
                Enter the address you used to sign up. We’ll send a fresh six-digit code.
              </p>
              <button
                type="submit"
                disabled={resendLoading}
                className={s.submitButton}
              >
                {resendLoading ? (
                  <LoaderCircle className={s.buttonIcon} aria-hidden="true" />
                ) : (
                  <ArrowRight className={s.buttonIcon} aria-hidden="true" />
                )}
                {resendLoading ? "Sending code…" : "Send verification code"}
              </button>
            </form>
          ) : (
            <>
              <div className={s.emailPanel}>
                <span className={s.emailLabel}>Code sent to</span>
                <span className={s.emailValue}>{email}</span>
                <button
                  type="button"
                  className={s.changeEmailButton}
                  onClick={() => {
                    setEmail("");
                    setOtp("");
                  }}
                >
                  Change
                </button>
              </div>

              <form onSubmit={handleVerify} className={s.form}>
                <label className={s.label} htmlFor="verification-code">
                  Six-digit code
                </label>
                <input
                  id="verification-code"
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
                  aria-describedby="otp-expiry"
                />
                <p id="otp-expiry" className={s.helperText}>
                  Your code is valid for 10 minutes.
                </p>
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
                  {loading ? "Verifying…" : "Verify email"}
                </button>
              </form>

              <div className={s.resendRow}>
                <span className={s.helperText}>Didn’t receive the email?</span>
                <button
                  type="button"
                  onClick={() => sendCode(email)}
                  disabled={resendLoading}
                  className={s.textButton}
                >
                  {resendLoading ? "Sending…" : "Resend code"}
                </button>
              </div>
            </>
          )}

          {signupOrigin ? (
            <Link to="/signup" className={s.backLink}>
              <ArrowLeft className={s.backIcon} aria-hidden="true" />
              Back to sign up
            </Link>
          ) : returnToLogin ? (
            <Link
              to="/login"
              state={{ email }}
              className={s.backLink}
            >
              <ArrowLeft className={s.backIcon} aria-hidden="true" />
              Back to login
            </Link>
          ) : (
            <div className="mt-7 flex flex-wrap justify-between gap-x-5">
              <Link
                to="/login"
                state={{ email }}
                className={s.backLink}
              >
                <ArrowLeft className={s.backIcon} aria-hidden="true" />
                Back to login
              </Link>
              <Link to="/signup" className={s.backLink}>
                Create an account
              </Link>
            </div>
          )}
        </div>
        <p className={s.footerNote}>Fresh food, delivered with care.</p>
      </section>
    </main>
  );
};

export default VerifyEmail;
