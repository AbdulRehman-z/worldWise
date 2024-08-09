import { z } from "zod";

const positionSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const citySchema = z.object({
  cityName: z.string(),
  country: z.string(),
  date: z.string().datetime(),
  emoji: z.string(),
  id: z.number(),
  notes: z.string(),
  position: positionSchema,
});

export const citiesSchema = z.array(citySchema);
export type CitiesArrayType = z.infer<typeof citiesSchema>;
export type CityType = z.infer<typeof citySchema>;
