"use client";

import { Product } from "@prisma/client";
import React, { createContext, ReactNode, useState } from "react";

export interface CardProduct extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

interface ICartContext {
  children: React.ReactNode;
  isOpen: boolean;
  products: CardProduct[];
  toggleCart: () => void;
  addProduct: (product: CardProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  total: number;
}

export const CartContext = createContext<ICartContext>({
  children: null,
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  total: 0,
});

CartContext.displayName = "CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CardProduct[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = (product: CardProduct) => {
    const productIsAlreadyOnTheCart = products.some((prevProduct) => prevProduct.id === product.id);

    if (!productIsAlreadyOnTheCart) {
      setProducts((prev) => [...prev, product]);
    }

    setProducts((prev) =>
      prev.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: product.quantity,
          };
        }
        return prevProduct;
      })
    );
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        if (prevProduct.quantity === 1) {
          return prevProduct;
        }

        return {
          ...prevProduct,
          quantity: prevProduct.quantity - 1,
        };
      })
    );
  };

  const increaseProductQuantity = (productId: string) => {
    setProducts((prev) => {
      return prev.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }

        return {
          ...prevProduct,
          quantity: prevProduct.quantity + 1,
        };
      });
    });
  };

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter((prevProduct) => prevProduct.id !== productId));
  };

  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        children,
        isOpen,
        products,
        total,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
