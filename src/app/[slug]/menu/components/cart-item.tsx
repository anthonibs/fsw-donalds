"use client";

import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CardProduct } from "../contexts/cart-context";

interface CartProductItemProps {
  item: CardProduct;
}

const CartProductItem = ({ item }: CartProductItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image src={item.imageUrl} alt={item.name} fill />
        </div>

        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-xs">{item.name}</p>
          <p className="text-sm font-semibold">{formatCurrency(item.price)}</p>

          <div className="flex items-center gap-1 text-center">
            <Button className="h-7 w-7 rounded-lg" variant={"outline"}>
              <ChevronLeftIcon />
            </Button>

            <p className="w-7 text-xs">{item.quantity}</p>

            <Button className="h-7 w-7 rounded-lg" variant={"destructive"}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <Button className="h-7 w-7 rounded-lg" variant="outline">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
