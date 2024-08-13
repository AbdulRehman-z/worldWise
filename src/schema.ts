import { z } from "zod";

const positionSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const citySchema = z.object({
  cityName: z.string(),
  country: z.string(),
  date: z.string().datetime(),
  emoji: z.string(),
  id: z.number(),
  notes: z.string(),
  position: positionSchema,
});

const LocalityInfoAdministrativeItemSchema = z.object({
  adminLevel: z.number().int(),
  description: z.string().optional(),
  geonameId: z.number().int().optional(),
  isoCode: z.string().optional(),
  isoName: z.string().optional(),
  name: z.string(),
  order: z.number().int(),
  wikidataId: z.string().optional(),
});

const LocalityInfoInformativeItemSchema = z.object({
  description: z.string().optional(),
  geonameId: z.number().int().optional(),
  isoCode: z.string().optional(),
  isoName: z.string().optional(),
  name: z.string(),
  order: z.number().int(),
  wikidataId: z.string().optional(),
});

const LocalityInfoSchema = z.object({
  administrative: z.array(LocalityInfoAdministrativeItemSchema),
  informative: z.array(LocalityInfoInformativeItemSchema),
});

const DataSchema = z.object({
  city: z.string().min(1),
  continent: z.string(),
  continentCode: z.string(),
  countryCode: z.string(),
  countryName: z.string(),
  latitude: z.number(),
  locality: z.string(),
  localityInfo: LocalityInfoSchema,
  localityLanguageRequested: z.string(),
  longitude: z.number(),
  lookupSource: z.string(),
  plusCode: z.string(),
  postcode: z.string(),
  principalSubdivision: z.string(),
  principalSubdivisionCode: z.string(),
});

export default DataSchema;

export const citiesSchema = z.array(citySchema);
export type CitiesArrayType = z.infer<typeof citiesSchema>;
export type CityType = z.infer<typeof citySchema>;
