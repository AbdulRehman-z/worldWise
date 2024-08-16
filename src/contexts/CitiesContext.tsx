/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  type CitiesArrayType,
  type CityType,
  citiesSchema,
  citySchema,
} from "../schema";
import { NewCityType } from "../components/Form";

type CitiesContextProps = {
  children: ReactNode;
};

type Cities = CitiesArrayType | [];
type City = CityType;

type CitiesContext = {
  cities: Cities;
  isLoading: boolean;
  getCity: (id: string) => Promise<void>;
  createCity: (city: NewCityType) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;

  currentCity: City | null;
};

type State = {
  cities: Cities;
  isLoading: boolean;
  currentCity: City | null;
  error: string;
};

type CitiesActions =
  | { type: "cities/loaded"; payload: Cities }
  | { type: "city/loaded"; payload: City }
  | { type: "city/created"; payload: City }
  | { type: "city/deleted"; payload: number }
  | { type: "loading" }
  | { type: "rejeted"; payload: string };

const initialState: State = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

function reducer(state: State, action: CitiesActions): State {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "rejeted":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown action");
  }
}

export const CitiesContext = createContext<CitiesContext | null>(null);

export default function CitiesContextProvider({
  children,
}: CitiesContextProps) {
  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState<Cities>([]);
  // const [isLoading, setLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState<City>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });

        const response = await fetch("http://localhost:3000/cities");
        const data = await response.json();
        const validateData = citiesSchema.safeParse(data);
        if (!validateData.success) {
          throw new Error(validateData.error.message);
        }
        console.log(validateData.data);
        // setCities(validateData.data);
        dispatch({ type: "cities/loaded", payload: validateData.data });
      } catch (error) {
        dispatch({
          type: "rejeted",
          payload: "error occured during fetching cities",
        });
      }
    }
    fetchCities();
  }, []);

  async function createCity(city: NewCityType) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch("http://localhost:3000/cities", {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      const validateData = citySchema.safeParse(data);
      if (!validateData.success) {
        throw new Error(validateData.error.message);
      }
      console.log(validateData.data);
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: validateData.data });
    } catch (error) {
      dispatch({
        type: "rejeted",
        payload: "error occured during creating city",
      });
    }
  }

  async function deleteCity(id: number) {
    try {
      dispatch({ type: "loading" });

      await fetch(`http://localhost:3000/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejeted",
        payload: "error occured during deleting city",
      });
    }
  }

  const getCity = useCallback(async function getCity(id: string) {
    try {
      // setLoading(true);
      dispatch({ type: "loading" });
      const response = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await response.json();
      const validateData = citySchema.safeParse(data);
      if (!validateData.success) {
        throw new Error(validateData.error.message);
      }
      // setCurrentCity(validateData.data);
      dispatch({ type: "city/loaded", payload: validateData.data });
    } catch (error) {
      dispatch({
        type: "rejeted",
        payload: "error occured during fetching a city",
      });
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
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
