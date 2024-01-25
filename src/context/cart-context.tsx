"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type ContextCartType = {
  cartProducts: Array<string> | [];
  addProductToCart: (v: string) => void;
  removeProductFromCart: (v: string) => void;
  removeProductFully: (v: string) => void;
  clearCart: () => void;
};

const defaults = {
  cartProducts: [],
  addProductToCart: (v: string) => {},
  removeProductFromCart: (v: string) => {},
  removeProductFully: (v: string) => {},
  clearCart: () => {},
};

export const CartContext = createContext<ContextCartType>(defaults);

export function CartProvider({ children }: PropsWithChildren) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("cart");
    const products = storedData ? JSON.parse(storedData) : [];
    setCartProducts(products);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }, 0);
  }, [cartProducts]);

  function addProductToCart(productId: string) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProductFromCart(productId: string) {
    const pos = cartProducts.indexOf(productId);
    setCartProducts((prev) => prev.filter((p, i) => i !== pos));
  }

  function removeProductFully(productId: string) {
    setCartProducts((prev) => prev.filter((p) => p !== productId));
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        removeProductFully,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
};
