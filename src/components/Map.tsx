import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import { useGeolocationHook } from "../hooks/useGeoLocation";
import useGetParamsHook from "../hooks/useGetParams";
import User from "./User";

function Map(): JSX.Element {
  const [mapPosition, setMapPosition] = useState({ lat: 40, lng: 0 });
  const {
    getPosition,
    isLoading: isGeoPositionLoading,
    position: geoLocationPosition,
  } = useGeolocationHook();

  const { cities } = useCitiesContext();
  const { lat, lng } = useGetParamsHook();

  useEffect(() => {
    if (lat && lng) {
      setMapPosition({ lat, lng });
    }
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition({
        lat: geoLocationPosition.lat,
        lng: geoLocationPosition.lng,
      });
    }

    console.log(mapPosition);
  }, [geoLocationPosition]);

  return (
    <div className="h-full relative">
      <User />
      {!geoLocationPosition && (
        <button
          className="btn-primary absolute z-50 left-1/2 top-3/4 mt-32 -translate-x-1/2"
          onClick={getPosition}
        >
          {isGeoPositionLoading
            ? "Getting Your Position..."
            : "Use Your Position"}
        </button>
      )}

      <MapContainer
        className="h-full bg-colorDark-2 relative z-10"
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://wwgw.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji} {city.country}.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

type ChangeCenterProps = {
  position: { lat: number; lng: number };
};

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView([position.lat, position.lng], map.getZoom());
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;
