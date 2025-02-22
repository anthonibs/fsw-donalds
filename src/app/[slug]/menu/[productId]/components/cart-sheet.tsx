import React, { useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart-context";

const CartSheet = () => {
  const { toggleCart, isOpen, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>

        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
