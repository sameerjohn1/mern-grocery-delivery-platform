import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
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
import GreenCart from "../../assets/greenCart.png";
import { Link } from "react-router-dom";
import { navbarStyles as s } from "../../assets/dummyStyles";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("freshmart-auth") === true,
  );

  useEffect(() => {
    const syncAuth = () => {
      setIsLoggedIn(localStorage.getItem("freshmart-auth") === "true");
    };

    window.addEventListener("storage", syncAuth);
    window.addEventListener("freshmart-auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("freshmart-auth-change", syncAuth);
    };
  }, []);

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
    localStorage.removeItem("token");
    localStorage.removeItem("freshmart-auth");
    localStorage.removeItem("freshmart-user");
    window.dispatchEvent(new Event("freshmart-auth-change"));
    setAccountState({ pathname: location.pathname, open: false });
    navigate("/login");
  };

  return (
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
          <button
            onClick={() => navigate("/orders")}
            className={s.actionButton}
          >
            <PackageCheck className={s.actionIcon} />
            <span className="truncate">My Orders</span>
          </button>

          <button onClick={() => navigate("/cart")} className={s.cartButton}>
            <ShoppingCart className={s.actionIcon} />
            <span>Cart</span>
            {totalItems > 0 ? (
              <span className={s.cartBadge}>{totalItems}</span>
            ) : null}
          </button>

          {isLoggedIn ? (
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
                <span className="truncate">Account</span>
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

                <button
                  type="button"
                  onClick={handleLogout}
                  className={s.dropdownItem}
                >
                  <LogOut className={s.dropdownIcon} />
                  Logout
                </button>
              </div>
            </div>
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
  );
};

export default Navbar;
