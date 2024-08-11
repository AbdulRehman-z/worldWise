import { Outlet } from "react-router-dom";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCitiesContext } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

function City() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return (
      <Message message="Select your first city by clicking on a city on the map." />
    );
  return (
    <div className="mt-8 w-96">
      <Outlet />
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </div>
  );
}

export default City;
