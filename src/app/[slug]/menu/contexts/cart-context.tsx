"use client";

import { Product } from "@prisma/client";
import React, { createContext, ReactNode, useState } from "react";

interface CardProduct extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

interface ICartContext {
  children: React.ReactNode;
  isOpen: boolean;
  products: CardProduct[];
  toggleCart: () => void;
  addProduct: (product: CardProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  children: null,
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

CartContext.displayName = "CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CardProduct[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const addProduct = (product: CardProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ children, isOpen, products, toggleCart, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};
