"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

interface IHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: IHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute left-4 top-4 z-10 rounded-full"
        aria-label="Voltar a página anterior"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        src={"/macdonalds.jpg"}
        alt={restaurant?.name}
        className="object-cover"
        fill
      />

      <Button
        variant={"secondary"}
        size={"icon"}
        className="absolute right-4 top-4 z-10 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
