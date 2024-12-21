"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <Image
            src="/assets/imgs/c1.jpg"
            alt="Railway Illustration"
            width="500"
            height="400"
            className="max-w-full h-auto"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/assets/imgs/c2.jpg"
            alt="Railway Illustration"
            width="500"
            height="400"
            className="max-w-full h-auto"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/assets/imgs/c3.jpg"
            alt="Railway Illustration"
            width="500"
            height="400"
            className="max-w-full h-auto"
            style={{ aspectRatio: "500/400", objectFit: "cover" }}
          />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

{
  /* <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-md"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel> */
}
