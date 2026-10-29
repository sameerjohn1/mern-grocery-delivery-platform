import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CART_STORAGE_KEY = "freshmart-cart";

const CartContext = createContext(null);

const loadCart = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item) => {
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
  };

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
    const subTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      cartItems,
      totalItems,
      subTotal,
      addItem,
      decreaseItem,
      removeItem,
      clearCart,
      getQuantity,
    };
  }, [cartItems, getQuantity]);

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
