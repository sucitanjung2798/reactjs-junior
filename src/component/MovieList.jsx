import { Link } from "react-router-dom";
import { useGetMoviesQuery } from "../feature/Api";
import seedrandom from "seedrandom";
import { formatToRupiah } from "../hooks/general";
// import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'

const MovieList = () => {
  const { data: movies, isLoading, isError } = useGetMoviesQuery("barbie");
  const movieList = movies?.Search;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  function generateConsistentRandomPrices(seed, movie, minPrice, maxPrice) {
    const rng = seedrandom(seed);

    return movieList.map((movie) => {
      const randomPrice =
        Math.floor(rng() * (maxPrice - minPrice + 1)) + minPrice;
      return { ...movie, price: randomPrice };
    });
  }

  const minPrice = 100000;
  const maxPrice = 1000000;
  const seed = "yourSeedHere";

  const itemsWithConsistentPrices = generateConsistentRandomPrices(
    seed,
    movieList,
    minPrice,
    maxPrice
  );

  function limitCharacters(str, limit) {
    if (str.length > limit) {
      return str.substring(0, limit) + "...";
    }
    return str;
  }

  return (
    <div>
      <div className="text-left p-4">
        <div className="grid grid-cols-4 gap-6 h-80 movie-list mb-4">
          {itemsWithConsistentPrices?.map((movie) => {
            return (
              <Link
                key={movie?.imdbID}
                to={{
                  pathname: `/detail/${movie?.imdbID}`,
                  state: { price: movie?.price },
                }}
              >
                <div className="border border-black rounded-lg cursor-pointer">
                  <img
                    src={movie?.Poster}
                    className="h-60 rounded-t-lg w-full"
                  />
                  <div className="h-20 rounded-b-lg grid content-center">
                    <div className="text-center text-sm font-bold">
                      {limitCharacters(movie?.Title, 20)}
                    </div>
                    <div className="text-sm text-center font-bold">
                      {movie?.Year}
                    </div>
                    <div className="text-sm text-center font-bold">
                      {formatToRupiah(movie?.price)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
