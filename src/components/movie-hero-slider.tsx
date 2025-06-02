import { useEffect, useState, useRef } from "react";
import type { GetMovie } from "../types/movie";
import MovieHero from "./movie-hero";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props {
    movies: GetMovie[];
}

const MovieHeroSlider = ({ movies }: Props) => {
    const [index, setIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % movies.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [movies.length]);

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + movies.length) % movies.length);
    };
    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % movies.length);
    };
    if (!movies.length) return null;

    return (
        <div className="relative overflow-hidden h-[70vh] w-full">
            <div
                ref={sliderRef}
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0 w-full h-full">
                        <MovieHero movie={movie} />
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 shadow transition duration-200"
                    aria-label="Scroll left"
                >
                    <HiChevronLeft className="text-xl text-gray-700" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 shadow transition duration-200"
                    aria-label="Scroll right"
                >
                    <HiChevronRight className="text-xl text-gray-700" />
                </button>
            </div>
            <div className="absolute bottom-1 md:bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {movies.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`size-2 md:size-3 rounded-full transition ${i === index ? "bg-white" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MovieHeroSlider;
