import { Link, useNavigate, useParams } from "react-router-dom";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useEffect } from "react";

import Spinner from "./Spinner";

function CityDetails() {
  const { id } = useParams();
  const { getId, currentCity, isLoading } = useCitiesContext();
  const navigate = useNavigate();

  function formateDate(date: string | undefined) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date || ""));
  }

  useEffect(() => {
    if (!id) return;
    getId(id);
  }, [id]);

  if (isLoading) return <Spinner />;
  if (!currentCity) return <p>City not found</p>;
  return (
    <div className="bg-colorDark-2 w-96 mt-10 flex flex-col gap-3 p-6 rounded-md text-colorLight-2">
      <div>
        <p className="text-colorLight-1 font-semibold">City Name</p>
        <p className="ml-2 mt-1">
          {currentCity?.emoji} {currentCity?.cityName}
        </p>
      </div>

      <div>
        <p className="text-colorLight-1 font-semibold">You went to lisbon on</p>
        <p className="">{formateDate(currentCity?.date)}</p>
      </div>

      <div>
        <p className="text-colorLight-1 font-semibold">Your note</p>
        <p className="">{currentCity?.notes}</p>
      </div>

      <div>
        <p className="text-colorLight-1 font-semibold">Learn more</p>
        <p className="text-colorbrand-1">
          <Link to={`https://en.wikipedia.org/wiki/${currentCity?.country}`}>
            🔗 Read more about {currentCity?.country} on Wikipedia
          </Link>
        </p>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
          console.log("submit");
        }}
        type="button"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
      >
        Back
      </button>
    </div>
  );
}

export default CityDetails;
