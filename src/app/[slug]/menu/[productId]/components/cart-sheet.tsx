import React, { useContext } from "react";

import { Sheet, SheetContent } from "@/components/ui/sheet";

import CartProductItem from "../../components/cart-item";
import { CartContext } from "../../contexts/cart-context";

const CartSheet = () => {
  const { toggleCart, isOpen, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%]">
        <div className="py-5">
          {products.map((product) => (
            <CartProductItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
