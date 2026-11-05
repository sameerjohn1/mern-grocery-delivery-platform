import { Component } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext.jsx";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("App render failed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
          <div className="max-w-md rounded-3xl border border-red-400/20 bg-[#0D241D] p-8">
            <h1 className="text-xl font-bold text-[#F6F3E8]">
              Something went wrong
            </h1>
            <p className="mt-3 text-sm text-[#A7C4B8]">
              {this.state.error.message}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-full bg-[#A7E8C1] px-5 py-2.5 text-sm font-bold text-[#0B2B21]"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
