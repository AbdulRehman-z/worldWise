import { CitiesArrayType } from "../schema";
import CityItem from "./CityItem";
import Message from "./Message";

type CityProps = {
  isLoading: boolean;
  cities: CitiesArrayType;
};

function City({ cities, isLoading }: CityProps) {
  if (isLoading)
    return <p className="mt-16 text-xl text-colorLight-3">Cities Loading...</p>;
  if (cities.length === 0)
    return (
      <Message message="Select your first city by clicking on a city on the map." />
    );
  return (
    <div className="mt-8 w-96">
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
}

export default City;
