import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { MovieSliderProps } from "../types/movie";
import CardMovie from "./card-movie";
import { useRef } from "react";

const MovieSlider = ({ title, movies }: MovieSliderProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo =
                direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-5 px-2">
                <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
                <div className="space-x-2 flex items-center">
                    <button
                        onClick={() => scroll("left")}
                        className="size-8 md:size-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 shadow transition duration-200"
                        aria-label="Scroll left"
                    >
                        <HiChevronLeft className="text-xl text-gray-700" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="size-8 md:size-10 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 shadow transition duration-200"
                        aria-label="Scroll right"
                    >
                        <HiChevronRight className="text-xl text-gray-700" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-hidden scroll-smooth gap-20 px-2 pb-2"
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="snap-start shrink-0 w-[110px] md:w-[180px]">
                        <CardMovie key={movie.id} {...movie} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MovieSlider;
