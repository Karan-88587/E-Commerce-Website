import React from 'react';

const MensCollections = () => {
    return (
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
    );
}

export default MensCollections;