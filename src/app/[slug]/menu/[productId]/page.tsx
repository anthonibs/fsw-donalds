import { notFound } from "next/navigation";
import React from "react";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/product-header";

interface IProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: IProductPageProps) => {
  const { productId, slug } = await params;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <>
      <ProductHeader product={product} />

      <div>{slug}</div>
    </>
  );
};

export default ProductPage;
