import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import City from "./components/City";
import { useEffect, useState } from "react";
import { CitiesArrayType, citiesSchema } from "./schema";
import Country from "./components/Country";

function App() {
  const [cities, setCities] = useState<CitiesArrayType | []>([]);
  const [isLoading, setLoading] = useState(false);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<City cities={cities} isLoading={isLoading} />}
          />
          <Route
            index
            path="cities"
            element={<City cities={cities} isLoading={isLoading} />}
          />
          <Route path="countries" element={<Country cities={cities} />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
