import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";

const Map = ({
  marker,
  isPreview,
  classname,
  handleChange,
}: {
  marker?: LatLngTuple;
  isPreview: boolean;
  classname?: string;
  handleChange?: (e) => void;
}) => {
  const [position, setPosition] = useState<LatLngTuple>(
    marker || [51.505, -0.09]
  );
  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse.php?&lat=${position[0]}&lon=${position[1]}&format=jsonv2`
      );
      const data = await response.json();
      console.log(data.display_name);
      if (handleChange) {
        handleChange((prev) => ({
          ...prev,
          pickupLocation: {
            location: data.display_name,
            latitude: position[0],
            longitude: position[1],
          },
        }));
      }
    };
    fetchLocation();
  }, [position]);

  const SetViewOnCLick = () => {
    useMapEvent("click", (e) => {
      console.log(e.latlng);
      setPosition([e.latlng.lat, e.latlng.lng]);
    });
    return null;
  };
  const markIcon = new Icon({
    iconUrl:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1hcC1waW4iPjxwYXRoIGQ9Ik0yMCAxMGMwIDYtOCAxMi04IDEycy04LTYtOC0xMmE4IDggMCAwIDEgMTYgMFoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSIzIi8+PC9zdmc+",
    iconSize: [38, 38],
  });

  return (
    <div className={`${classname}`}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        dragging={true}
        className="w-full h-80"
        maxBoundsViscosity={0.5}
        maxBounds={[
          [90, -180],
          [-90, 180],
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markIcon}></Marker>
        {!isPreview && <SetViewOnCLick />}
      </MapContainer>
    </div>
  );
};

export const MapPopup = ({ handleChange }) => {
  return (
    <div className="mt-[20%] py-7 ">
      <div>
        <h1 className="text-bold text-xl text-center">Pick the address :</h1>
      </div>
      <input
        type="text"
        name="description"
        placeholder="Search for places"
        required
        className="w-3/4 px-4 py-2 border block mx-auto rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <Map
        isPreview={false}
        handleChange={handleChange}
        classname="w-3/4 mx-auto"
      />
    </div>
  );
};

export default Map;
