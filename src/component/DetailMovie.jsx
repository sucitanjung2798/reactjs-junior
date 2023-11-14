import { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useGetDetailMovieQuery } from "../feature/Api";
import { FaStar, FaRegStar, FaMinus, FaPlus } from "react-icons/fa";
import { formatToRupiah } from "../hooks/general";

const DetailMovie = () => {
  const location = useLocation();
  const { price } = location?.state || {};
  const { imdbID } = useParams();
  const { data: movie, isLoading } = useGetDetailMovieQuery(imdbID);
  const maxRating = 5;
  const starPercentage = (movie?.imdbRating / 10) * maxRating;
  const filledStars = Math.round(starPercentage);
  const remainingStars = maxRating - filledStars;

  const hours = Math.floor(movie?.Runtime.split(" ")[0] / 60);
  const remainingMinutes = movie?.Runtime.split(" ")[0] % 60;

  const [count, setCount] = useState(1);
  const [isDisabled] = useState(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  };

  const subtotal = formatToRupiah(price * count);

  return (
    <div className="w-full">
      <div className="flex flex-row gap-4 justify-between">
        <div className="w-4/6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-row gap-6">
              <img
                src={movie?.Poster}
                alt="Poster"
                className="border rounded-xl"
                width={"200px"}
              />
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-3xl text-left font-medium text-black">
                    {movie?.Title}
                  </h1>
                  <p className="text-sm text-left">{`${hours}h ${remainingMinutes}m`}</p>
                  <p className="text-sm text-left">{movie?.Year}</p>
                </div>

                <div className="text-left flex flex-row gap-9">
                  <div>
                    <p className="text-xl text-pink-600">{movie?.imdbRating}</p>
                    <p className="text-gray-400 text-sm font-light">Ratings</p>
                  </div>
                  <div className="grid content-between">
                    <div className="flex flex-row mt-1">
                      <div className="flex flex-row">
                        {[...Array(filledStars || 0)].map((star, index) => (
                          <FaStar
                            color="rgb(219 39 119)"
                            key={index}
                            size={15}
                          />
                        ))}
                      </div>

                      <div className="flex flex-row">
                        {[...Array(remainingStars || 0)].map((star, index) => (
                          <FaRegStar color="#e4e5e9" key={index} size={15} />
                        ))}
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm font-light mt-1">
                      Grade Now
                    </div>
                  </div>
                </div>

                <p className="text-left text-xl font-bold">
                  {formatToRupiah(price)}
                </p>

                <div className="text-left">
                  <div
                    className="grid grid-cols-2 gap-4"
                    style={{ width: "250px" }}
                  >
                    {movie?.Genre?.split(",").map((text, index) => (
                      <div key={index}>
                        <div className="bg-slate-200 text-center p-2 rounded-full text-gray-600 text-sm font-medium ">
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left">
              <p className="text-xl font-medium text-slate-950">Story Line</p>
              <p className="mt-1 text-gray-600 text-justify">{movie?.Plot}</p>
            </div>

            <div className="text-left">
              <p className="text-xl font-medium text-slate-950">Actors</p>
              <p className="mt-1 text-gray-600">{movie?.Actors}</p>
            </div>
          </div>
        </div>

        <div className="w-2/6 mt-2">
          <div className="border border-gray-400 rounded-lg py-2 px-4 flex flex-col gap-4">
            <div className="font-semibold" style={{ textAlign: "left" }}>
              Atur jumlah
            </div>

            <div className="flex justify-center">
              <div
                className="border p-1 w-38 rounded-lg flex flex-row gap-2 flex justify-between"
                style={{
                  borderColor: "#BFC9D9",
                }}
              >
                <button
                  onClick={decreaseCount}
                  disabled={count === 1 ? isDisabled : !isDisabled}
                >
                  <FaMinus
                    color={count === 1 ? "#BFC9D9" : "rgb(219 39 119)"}
                    size={12}
                  />
                </button>
                <input
                  readOnly
                  value={count}
                  type="text"
                  className="w-10 bg-transparent border border-none outline-none text-center"
                />
                <button
                  onClick={increaseCount}
                  disabled={count === 10 ? isDisabled : !isDisabled}
                >
                  <FaPlus
                    color={count === 10 ? "#BFC9D9" : "rgb(219 39 119)"}
                    size={12}
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div style={{ color: "#6D7588" }}>Subtotal</div>
              <div className="text-lg font-bold">{subtotal}</div>
            </div>

            <div className="flex flex-row gap-4 items-center justify-center">
              <button
                className="text-center font-semibold"
                style={{
                  border: "1px solid rgb(219 39 119)",
                  width: "100%",
                  height: "37px",
                  color: "rgb(219 39 119)",
                }}
              >
                Beli Langsung
              </button>
              <button
                className="font-semibold text-white"
                style={{
                  width: "100%",
                  backgroundColor: "rgb(219 39 119)",
                  height: "37px",
                }}
              >
                Keranjang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
