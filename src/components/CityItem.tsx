import { Link } from "react-router-dom";
import { type CityType } from "../schema";
import { useCitiesContext } from "../contexts/CitiesContext";

type CityItemProps = {
  city: CityType;
};

function CityItem({ city }: CityItemProps) {
  const { currentCity } = useCitiesContext();

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  }

  return (
    <Link
      to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      className={`py-2 my-3 first:mt-0 last:mb-0 hover:shadow-lg transition-all duration-100 ease-linear  cursor-pointer  text-sm flex items-center justify-between px-4 rounded-lg bg-colorDark-2 
        ${currentCity?.id === city.id ? "border-2 border-colorbrand-1" : ""}
      `}
    >
      <div className="flex gap-2">
        <p>{city.emoji}</p>
        <p>{city.cityName}</p>
      </div>
      <div className="flex gap-2 items-center">
        <p>{formatDate(city.date)}</p>
        <button className="size-5 rounded-full bg-colorDark-1 text-colorLight-2 cursor-pointer hover:bg-colorbrand-1 transition-all duration-200 ease-linear">
          &times;
        </button>
      </div>
    </Link>
  );
}

export default CityItem;
