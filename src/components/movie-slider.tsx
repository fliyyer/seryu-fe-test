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
                <h2 className="text-4xl font-bold">{title}</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => scroll("left")}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                        aria-label="Scroll left"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                        aria-label="Scroll right"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-hidden scroll-smooth gap-20 px-2 pb-2"
            >
                {movies.map((movie) => (
                    <div key={movie.id} className="snap-start shrink-0 w-[180px]">
                        <CardMovie
                            id={movie.id}
                            title={movie.title}
                            release_date={movie.release_date}
                            poster_path={movie.poster_path}
                            vote_average={movie.vote_average}
                            vote_count={movie.vote_count}
                            genre_ids={movie.genre_ids || []}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MovieSlider;
