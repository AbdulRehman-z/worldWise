/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type CitiesArrayType,
  type CityType,
  citiesSchema,
  citySchema,
} from "../schema";

type CitiesContextProps = {
  children: ReactNode;
};

type Cities = CitiesArrayType | [];
type City = CityType | null;

type CitiesContext = {
  cities: Cities;
  isLoading: boolean;
  getId: (id: string) => void;
  currentCity: City;
};

export const CitiesContext = createContext<CitiesContext | null>(null);

export default function CitiesContextProvider({
  children,
}: CitiesContextProps) {
  const [cities, setCities] = useState<Cities>([]);
  const [isLoading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<City>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3000/cities");
        const data = await response.json();
        const validateData = citiesSchema.safeParse(data);
        if (!validateData.success) {
          throw new Error(validateData.error.message);
        }
        console.log(validateData.data);
        setCities(validateData.data);
      } catch (error) {
        alert(`Error: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getId(id: string) {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await response.json();
      const validateData = citySchema.safeParse(data);
      if (!validateData.success) {
        throw new Error(validateData.error.message);
      }
      setCurrentCity(validateData.data);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getId,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error(
      "Context should be accessed from inside of the CitiesContextProvider"
    );
  }
  return context;
}

// export { CitiesContextProvider, useCitiesContext };
