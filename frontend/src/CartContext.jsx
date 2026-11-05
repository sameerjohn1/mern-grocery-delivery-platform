import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { REDIRECT_KEY } from "./auth/authStorage";

const CART_STORAGE_KEY = "GreenCart-cart";

const CartContext = createContext(null);

const loadCart = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  if (!savedCart) return [];

  const cartItems = JSON.parse(savedCart);
  return cartItems.map((item) =>
    item.productModel === "GreenCart"
      ? { ...item, productModel: "Hookah" }
      : item,
  );
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = useCallback(
    (item) => {
      if (!isAuthenticated) {
        const redirectPath = `${location.pathname}${location.search}`;
        localStorage.setItem(REDIRECT_KEY, redirectPath);
        navigate("/login", {
          state: { from: redirectPath, reason: "login-required" },
        });
        return false;
      }

      setCartItems((current) => {
        const existingItem = current.find(
          (cartItem) => cartItem.cartId === item.cartId,
        );

        if (existingItem) {
          return current.map((cartItem) =>
            cartItem.cartId === item.cartId
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          );
        }

        return [{ ...item, quantity: 1 }, ...current];
      });

      return true;
    },
    [isAuthenticated, location.pathname, location.search, navigate],
  );

  const decreaseItem = (cartId) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (cartId) => {
    setCartItems((current) => current.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getQuantity = useCallback(
    (cartId) => cartItems.find((item) => item.cartId === cartId)?.quantity || 0,
    [cartItems],
  );

  const value = useMemo(() => {
    const totalItems = cartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      cartItems,
      totalItems,
      subtotal,
      addItem,
      decreaseItem,
      removeItem,
      clearCart,
      getQuantity,
    };
  }, [cartItems, addItem, getQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// The provider and its context hook intentionally share this module.
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
