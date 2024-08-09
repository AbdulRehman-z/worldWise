import { CitiesArrayType } from "../schema";
import CountryItem from "./CountryItem";
import Message from "./Message";

type CountryProps = {
  cities: CitiesArrayType;
};

function Country({ cities }: CountryProps) {
  if (cities.length === 0)
    return (
      <Message message="Select your first city by clicking on a city on the map." />
    );

  const uniqueCountries = cities.reduce<{ country: string; emoji: string }[]>(
    (arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji }];
      else return arr;
    },
    []
  );

  return (
    <ul className="mt-8 w-96 grid grid-cols-2">
      {uniqueCountries.map((city) => (
        <CountryItem
          key={city.country}
          country={city.country}
          emoji={city.emoji}
        />
      ))}
    </ul>
  );
}

export default Country;
