"use client";

import { Product } from "@prisma/client";
import React, { createContext, ReactNode, useState } from "react";

interface CardProduct extends Product {
  quantity: number;
}

interface ICartContext {
  children: React.ReactNode;
  isOpen: boolean;
  products: CardProduct[];
  toggleCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  children: null,
  isOpen: false,
  products: [],
  toggleCart: () => {},
});

CartContext.displayName = "CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<CardProduct[]>([]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CartContext.Provider value={{ children, isOpen, products, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
