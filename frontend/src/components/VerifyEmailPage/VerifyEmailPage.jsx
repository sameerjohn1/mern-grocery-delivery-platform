import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { resendOtp, verifyEmail } from "../../api/api";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const normalizedEmail = String(formData.get("email")).trim().toLowerCase();
    const otp = String(formData.get("otp")).trim();

    setEmail(normalizedEmail);
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await verifyEmail({ email: normalizedEmail, otp });
      setMessage("Email verified. You can now log in.");
      window.setTimeout(() => {
        navigate("/login", { state: { email: normalizedEmail } });
      }, 900);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Verification failed. Please try again.",
      );
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setErrorMessage("Enter your email address first.");
      return;
    }

    setErrorMessage("");
    setMessage("");
    setIsResending(true);

    try {
      await resendOtp({ email: normalizedEmail });
      setMessage("A new verification code has been sent to your email.");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Could not resend the code. Please try again.",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="auth-page flex min-h-screen items-center justify-center bg-black px-4 py-10 text-[#D1FAE5]">
      <section className="w-full max-w-md rounded-4xl border border-[#1F3B32] bg-[#0D241D] p-6 shadow-2xl shadow-[#34D399]/5 sm:p-8">
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#34D399]/10 text-[#34D399]">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <p className="font-store-label text-sm font-black uppercase tracking-wide text-[#34D399]">
          Verify email
        </p>
        <h1 className="font-store-display mt-2 text-3xl font-black text-[#D1FAE5]">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#A7C4B8]">
          Enter the 6-digit code we sent to your email address.
        </p>

        <form onSubmit={handleVerify} className="mt-7 space-y-4">
          <label className="block">
            <span className="font-store-label mb-2 block text-sm font-bold text-[#D1FAE5]">
              Email address
            </span>
            <span className="flex items-center gap-3 rounded-2xl border border-[#1F3B32] bg-[#071B16]/70 px-4 py-3.5 focus-within:border-[#34D399]/60">
              <Mail className="h-5 w-5 text-[#34D399]" />
              <input
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="auth-field w-full bg-transparent text-sm font-semibold text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/65"
              />
            </span>
          </label>

          <label className="block">
            <span className="font-store-label mb-2 block text-sm font-bold text-[#D1FAE5]">
              Verification code
            </span>
            <input
              name="otp"
              type="text"
              required
              minLength={6}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              placeholder="000000"
              className="auth-field w-full rounded-2xl border border-[#1F3B32] bg-[#071B16]/70 p-4 text-center text-xl font-bold tracking-[0.5em] text-[#D1FAE5] outline-none placeholder:text-[#A7C4B8]/50 focus:border-[#34D399]/60"
            />
          </label>

          {errorMessage && (
            <p className="text-sm font-semibold text-red-300" role="alert">
              {errorMessage}
            </p>
          )}
          {message && (
            <p
              className="flex items-center gap-2 text-sm font-semibold text-[#6EE7B7]"
              role="status"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-store-label mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#34D399] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#065F46] transition hover:bg-[#6EE7B7] disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-4 text-center text-sm font-semibold text-[#A7C4B8]">
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-store-label cursor-pointer font-black text-[#34D399] transition hover:text-[#6EE7B7] disabled:cursor-wait disabled:opacity-70"
          >
            {isResending ? "Sending code..." : "Resend verification code"}
          </button>
          <Link className="transition hover:text-[#D1FAE5]" to="/signup">
            Back to signup
          </Link>
        </div>
      </section>
    </main>
  );
};

export default VerifyEmailPage;
