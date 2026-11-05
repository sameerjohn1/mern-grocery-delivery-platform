import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  ChevronDown,
  LogOut,
  LogIn,
  MapPinPlus,
  PackageCheck,
  Search,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useCart } from "../../CartContext";
import { useAuth } from "../../auth/AuthContext";
import GreenCart from "../../assets/greenCart.png";
import { Link } from "react-router-dom";
import { navbarStyles as s } from "../../assets/dummyStyles";

const LOGOUT_TOAST_KEY = "gc:logout-toast";
const LOGOUT_TOAST_MESSAGE = "Logged out successfully";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, clearCart } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [toastMessage, setToastMessage] = useState(
    () => sessionStorage.getItem(LOGOUT_TOAST_KEY) || "",
  );
  const isCartActive = location.pathname === "/cart";
  const isOrdersActive = location.pathname === "/orders";

  const showToast = (message) => setToastMessage(message);

  useEffect(() => {
    sessionStorage.removeItem(LOGOUT_TOAST_KEY);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = window.setTimeout(() => setToastMessage(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);
  const [accountState, setAccountState] = useState({
    pathname: location.pathname,
    open: false,
  });
  const accountOpen =
    accountState.pathname === location.pathname && accountState.open;
  const [navbarState, setNavbarState] = useState({
    pathname: location.pathname,
    hidden: false,
  });
  const isNavbarHidden =
    navbarState.pathname === location.pathname && navbarState.hidden;
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      setNavbarState({
        pathname: location.pathname,
        hidden: isScrollingDown && currentScrollY > 120,
      });
      if (isScrollingDown) {
        setAccountState({ pathname: location.pathname, open: false });
      }
      lastScrollY.current = Math.max(currentScrollY, 0);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const updateSearchQuery = (value, options = { replace: true }) => {
    const nextQuery = value.trim();
    navigate(
      {
        pathname: "/",
        search: nextQuery ? `?q=${encodeURIComponent(nextQuery)}` : "",
      },
      {
        options,
      },
    );
  };

  const handleSearchChange = (event) => {
    const nextValue = event.target.value;
    setSearchTerm(nextValue);
    updateSearchQuery(nextValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateSearchQuery(searchTerm, { replace: false });
  };

  const handleLogout = () => {
    logout();
    clearCart();
    setAccountState({ pathname: location.pathname, open: false });

    if (location.pathname === "/") {
      showToast(LOGOUT_TOAST_MESSAGE);
    } else {
      sessionStorage.setItem(LOGOUT_TOAST_KEY, LOGOUT_TOAST_MESSAGE);
    }

    navigate("/", { replace: true });
  };

  return (
    <>
      <header
        className={`${s.headerBase} ${isNavbarHidden ? s.headerHidden : s.headerVisible} `}
      >
        <div className={s.container}>
          {/* Left: Logo + Store Name */}
          <Link to="/" className={s.logoLink}>
            <div className={s.logoWrapper}>
              <div className={s.logoImageWrapper}>
                <img
                  src={GreenCart}
                  alt="GreenCart Grocery logo"
                  className={s.logoImage}
                />
              </div>

              <div className={s.logoTextWrapper}>
                <h1 className={s.logoTitle}>GreenCart Grocery</h1>
                <p className={s.logoSubtitle}>Fast Grocery Delivery</p>
              </div>
            </div>
          </Link>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearch} className={s.searchForm}>
            <div className={s.searchContainer}>
              <div className={s.searchInputWrapper}>
                <Search className={s.searchIcon} />
                <input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={s.searchInput}
                />
              </div>

              <button type="submit" className={s.searchButton}>
                Search
              </button>
            </div>
          </form>

          {/* Right: Login + Cart */}
          <div className={s.actionsWrapper}>
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/orders")}
                className={
                  isOrdersActive ? s.actionButtonActive : s.actionButton
                }
              >
                <PackageCheck className={s.actionIcon} />
                <span className="truncate">My Orders</span>
              </button>
            ) : null}

            <button
              onClick={() => navigate("/cart")}
              className={isCartActive ? s.cartButtonActive : s.cartButton}
            >
              <ShoppingCart className={s.actionIcon} />
              <span>Cart</span>
              {totalItems > 0 ? (
                <span className={s.cartBadge}>{totalItems}</span>
              ) : null}
            </button>

            {isAuthenticated ? (
              <>
                <div className={s.accountDropdownWrapper}>
                  <button
                    type="button"
                    onClick={() =>
                      setAccountState({
                        pathname: location.pathname,
                        open: !accountOpen,
                      })
                    }
                    className={s.actionButton}
                    aria-expanded={accountOpen}
                  >
                    <UserRound className={s.actionIcon} />
                    <span className="truncate">{user?.name || "Account"}</span>
                    <ChevronDown className={s.dropdownChevron} />
                  </button>

                  <div
                    className={`${s.dropdownMenu} ${accountOpen ? s.dropdownOpen : s.dropdownClosed}`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setAccountState({
                          pathname: location.pathname,
                          open: false,
                        });
                        navigate("/address");
                      }}
                      className={s.dropdownItem}
                    >
                      <MapPinPlus className={s.dropdownIcon} />
                      Add Address
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={s.actionButton}
                >
                  <LogOut className={s.actionIcon} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/login")}
                className={s.actionButton}
              >
                <LogIn className={s.actionIcon} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {toastMessage ? (
        <div className={s.logoutToast} role="status" aria-live="polite">
          <CheckCircle2 className={s.logoutToastIcon} />
          <span>{toastMessage}</span>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
