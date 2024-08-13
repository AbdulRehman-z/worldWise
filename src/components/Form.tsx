import { useNavigate } from "react-router-dom";
import useGetParamsHook from "../hooks/useGetParams";
import { useEffect, useState } from "react";
import DataSchema from "../schema";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export type NewCityType = {
  id?: string;
  country: string;
  cityName: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
};

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const { isLoading, createCity } = useCitiesContext();
  const { lat, lng } = useGetParamsHook();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [locality, setlocality] = useState("");
  const [country, setCountryName] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [flag, setFlag] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(() => {
    async function fetchCity() {
      try {
        setIsLoadingGeocoding(true);
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        const validatedata = DataSchema.safeParse(data);
        if (!validatedata.success) {
          throw new Error(
            "That dosen't seem to be a valid location 😕. Click somewhere else!"
          );
        }

        setlocality(validatedata.data.city || validatedata.data.countryName);
        setFlag(convertToEmoji(validatedata.data.countryCode));
        setCountryName(validatedata.data.countryName);
      } catch (error: Error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }

    fetchCity();
    return () => setGeoCodingError("");
  }, [lat, lng]);

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!locality) {
      setGeoCodingError("Please select a valid location");
      return;
    }

    const newCity = {
      country: country,
      cityName: locality,
      emoji: flag,
      date: date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && lng) return <Message message="Click somewhere on the map!" />;
  if (isLoadingGeocoding) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  return (
    <form className="min-w-96 mx-auto mt-10 p-4 bg-colorDark-2 text-colorLight-2 rounded shadow">
      <div className="mb-4"></div>
      <div className="mb-4">
        <label htmlFor="city" className="block  text-sm font-bold mb-2">
          City Name
        </label>
        <input
          onChange={() => console.log("hello")}
          value={`${locality} ${flag}`}
          type="text"
          id="city"
          className="shadow appearance-none  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block  text-sm font-bold mb-2">
          When did you go to {locality}?
        </label>
        <DatePicker
          className="shadow appearance-none border w-[352px] rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          selected={date}
          onChange={(date) => setDate(date!)}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className="block  text-sm font-bold mb-2">
          Notes
        </label>
        <textarea
          placeholder="Write your notes here"
          id="notes"
          className="shadow appearance-none  border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        ></textarea>
      </div>
      <div className="flex justify-end">
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
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 hove text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;
