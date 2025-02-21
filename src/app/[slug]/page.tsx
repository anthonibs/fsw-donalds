import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center">
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant?.name}</h2>
      </div>

      <div className="space-y-12 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-14">
        <ConsumptionMethodOption
          imageUrl="/dine_in.png"
          buttontext="Para comer aqui"
          imageAlt="Para comer aqui"
          option="DINE_IN"
          slug={restaurant.slug}
        />

        <ConsumptionMethodOption
          imageUrl="/takeaway.png"
          buttontext="Para levar"
          imageAlt="Para levar"
          option="TAKEAWAY"
          slug={restaurant.slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
