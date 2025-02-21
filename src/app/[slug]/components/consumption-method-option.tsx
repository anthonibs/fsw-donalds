import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface IConsumptionMethodOptionProps {
  imageUrl: string;
  imageAlt: string;
  buttontext: string;
  option: ConsumptionMethod;
  slug: string;
}

const ConsumptionMethodOption = ({
  buttontext,
  imageAlt,
  imageUrl,
  option,
  slug,
}: IConsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="object-contain"
            fill
          />
        </div>
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttontext}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
