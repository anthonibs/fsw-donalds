"use server";

import { ConsumptionMethod } from "@prisma/client";
import { redirect } from "next/navigation";

import { removerCpfPunctuation } from "@/helpers/cpf-valid";
import { db } from "@/lib/prisma";

interface ICreateOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;

  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: ICreateOrderInput) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));

  await db.order.create({
    data: {
      restaurantId: restaurant.id,
      consumptionMethod: input.consumptionMethod,
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removerCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
    },
  });

  redirect(`/${input.slug}/orders?cpf=${removerCpfPunctuation(input.customerCpf)}`);
};
