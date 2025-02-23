import React, { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import CartProductItem from "../../components/cart-item";
import FinishOrderDialog from "../../components/finish-order-button";
import { CartContext } from "../../contexts/cart-context";

const CartSheet = () => {
  const { toggleCart, isOpen, products, total } = useContext(CartContext);

  const [finishOrderDialogOpen, setFinishOrderDialogOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-full w-full flex-col gap-2 py-5">
          <div className="flex-auto">
            {products.map((product) => (
              <CartProductItem key={product.id} product={product} />
            ))}
          </div>

          <Card>
            <CardContent className="p-5">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-sm font-semibold">{formatCurrency(total)}</p>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full rounded-full" onClick={() => setFinishOrderDialogOpen(true)}>
            Finalizar pedido
          </Button>

          <FinishOrderDialog open={finishOrderDialogOpen} onOpenChange={setFinishOrderDialogOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
