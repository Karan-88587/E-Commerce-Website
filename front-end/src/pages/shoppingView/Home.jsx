import React, { useRef } from 'react';
import MenImageSlider from '../../assets/men.webp';
import WomenImageSlider from '../../assets/women.webp';
import KidsImageSlider from '../../assets/kids.webp';
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { FiArrowRightCircle } from "react-icons/fi";
import { Image, ImageKitProvider } from "@imagekit/react";

const imageData = [
    {
        id: "men_image",
        image: MenImageSlider,
        title: "Best Men's Collection",
        alt: "Men's Collection"
    },
    {
        id: "women_image",
        image: WomenImageSlider,
        title: "Best Women's Collection",
        alt: "Women's Collection"
    },
    {
        id: "kids_image",
        image: KidsImageSlider,
        title: "Best Kids's Collection",
        alt: "Kids's Collection"
    }
];

const Home = () => {

    const imageKitUrl = import.meta.env.VITE_APP_IMAGE_KIT_URL_ENDPOINT;

    const plugin = useRef(
        Autoplay({ delay: 2500, stopOnInteraction: false })
    );

    return (
        <>
            <div className="w-full flex justify-center bg-gray-50">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-11/12 md:w-3/4 lg:w-full shadow-lg overflow-hidden"
                    onMouseEnter={() => plugin.current.stop()}
                    onMouseLeave={() => plugin.current.reset()}
                >
                    <CarouselContent>
                        {imageData.map((data) => (
                            <CarouselItem key={data.id}>
                                <div className="relative w-full h-[400px] md:h-[500px]">
                                    <img
                                        src={data.image}
                                        alt={data.alt}
                                        className="w-full h-full object-cover"
                                    />
                                    <ImageKitProvider urlEndpoint={imageKitUrl}>
                                        <Image
                                            src={data.image}
                                            alt={data.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover"
                                        />
                                    </ImageKitProvider>
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                                            {data.title}
                                        </h2>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-white/70 hover:bg-white shadow-md" />
                    <CarouselNext className="bg-white/70 hover:bg-white shadow-md" />
                </Carousel>
            </div>

            <div className="py-12 bg-gray-50">
                {/* Heading */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8 text-orange-400">
                    Newly Arrived Men&apos;s Collection
                </h1>

                {/* Carousel */}
                <Carousel
                    opts={{ align: "start" }}
                    orientation="horizontal"
                    className="w-full max-w-[90%] md:max-w-4xl lg:max-w-6xl mx-auto"
                >
                    <CarouselContent className="gap-6">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
                            >
                                <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-lg">
                                    <img
                                        src={MenImageSlider}
                                        alt="Men's Collection"
                                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                        {/* View All Card */}
                        <CarouselItem className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Card className="flex items-center justify-center h-48 md:h-60 rounded-xl shadow-md hover:shadow-lg cursor-pointer group transition">
                                <CardContent className="flex flex-col items-center justify-center gap-2">
                                    <FiArrowRightCircle className="text-4xl text-green-600 group-hover:scale-110 transition" />
                                    <p className="text-lg font-semibold text-gray-700 group-hover:text-green-600">
                                        View All
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>

                    {/* Arrows */}
                    <CarouselPrevious className="hidden lg:block px-2 bg-white shadow-md hover:bg-gray-100" />
                    <CarouselNext className="hidden lg:block px-2 bg-white shadow-md hover:bg-gray-100" />
                </Carousel>
            </div>

            <div className="py-12 bg-gray-50">
                {/* Heading */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8 text-orange-400">
                    Newly Arrived Women&apos;s Collection
                </h1>

                {/* Carousel */}
                <Carousel
                    opts={{ align: "start" }}
                    orientation="horizontal"
                    className="w-full max-w-[90%] md:max-w-4xl lg:max-w-6xl mx-auto"
                >
                    <CarouselContent className="gap-6">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
                            >
                                <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-lg">
                                    <img
                                        src={WomenImageSlider}
                                        alt="Women's Collection"
                                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                        {/* View All Card */}
                        <CarouselItem className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Card className="flex items-center justify-center h-48 md:h-60 rounded-xl shadow-md hover:shadow-lg cursor-pointer group transition">
                                <CardContent className="flex flex-col items-center justify-center gap-2">
                                    <FiArrowRightCircle className="text-4xl text-green-600 group-hover:scale-110 transition" />
                                    <p className="text-lg font-semibold text-gray-700 group-hover:text-green-600">
                                        View All
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>

                    {/* Arrows */}
                    <CarouselPrevious className="hidden lg:block px-2 bg-white shadow-md hover:bg-gray-100" />
                    <CarouselNext className="hidden lg:block px-2 bg-white shadow-md hover:bg-gray-100" />
                </Carousel>
            </div>

            <div className="py-12 bg-gray-50">
                {/* Heading */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-8 text-orange-400">
                    Newly Arrived Kids&apos;s Collection
                </h1>

                {/* Carousel */}
                <Carousel
                    opts={{ align: "start" }}
                    orientation="horizontal"
                    className="w-full max-w-[90%] md:max-w-4xl lg:max-w-6xl mx-auto"
                >
                    <CarouselContent className="gap-6">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
                            >
                                <div className="relative w-full h-47 md:h-60 overflow-hidden rounded-lg">
                                    <img
                                        src={KidsImageSlider}
                                        alt="Kid's Collection"
                                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                        {/* View All Card */}
                        <CarouselItem className="basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <Card className="flex items-center justify-center h-48 md:h-60 rounded-xl shadow-md hover:shadow-lg cursor-pointer group transition">
                                <CardContent className="flex flex-col items-center justify-center gap-2">
                                    <FiArrowRightCircle className="text-4xl text-green-600 group-hover:scale-110 transition" />
                                    <p className="text-lg font-semibold text-gray-700 group-hover:text-green-600">
                                        View All
                                    </p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>

                    {/* Arrows */}
                    <CarouselPrevious className="hidden lg:block px-2 bg-white shadow-md hover:bg-gray-100" />
                    <CarouselNext className="hidden lg:block px-2 bg-white shadow-md hover:bg-gray-100" />
                </Carousel>
            </div>
        </>
    );
}

export default Home;