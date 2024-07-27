import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { IGeoLocationResponse, ILocationSearchResult } from "@/types/types";
import axios from "axios";

const FindComponent = ({ position }) => {
  const map = useMap();
  map.flyTo(position, map.getZoom());

  return null;
};

const Map = ({
  marker,
  isPreview,
  classname,
  handleChange,
  setSelectedLocation,
}: {
  marker: LatLngTuple;
  isPreview: boolean;
  classname?: string;
  handleChange?: (e) => void;
  setSelectedLocation?: (e) => void;
}) => {
  const [position, setPosition] = useState<LatLngTuple>(marker);
  const [center, setCenter] = useState<LatLngTuple>(marker);
  // console.log(position);
  useEffect(() => {
    setPosition(marker);
    setCenter(marker);
  }, [marker]);

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
      if (setSelectedLocation) setSelectedLocation(data.display_name);
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
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        dragging={true}
        className={`w-full ${isPreview ? "h-52" : "h-96"}`}
        maxBoundsViscosity={0.5}
        maxBounds={[
          [90, -180],
          [-90, 180],
        ]}
      >
        <FindComponent position={position} />
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
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState<ILocationSearchResult[]>();
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple>();
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const searchApi = import.meta.env.VITE_MAPS_REVERSE_SEARCH_API as string;
  const handleCurrentSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (!searchTerm) {
        setLocation([]);
        return;
      }
      const response = await fetch(
        `${searchApi}?q=${searchTerm}&format=jsonv2`
      );
      const data: ILocationSearchResult[] = await response.json();
      setLocation(data);
    };
    const timeout = setTimeout(async () => await fetchLocation(), 1000);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    const ipLocaion = async () => {
      const response = await axios.get("https://ipapi.co/json", {
        withCredentials: false,
      });
      const data: IGeoLocationResponse = await response.data;
      const latlng: LatLngTuple = [data.latitude, data.longitude];
      console.log("tessst");

      setCurrentPosition(latlng);
    };
    ipLocaion();
  }, []);

  return (
    currentPosition && (
      <div className="flex flex-col md:flex-row gap-2">
        <form
          onSubmit={handleCurrentSubmit}
          className="flex flex-col items-center  max-h-[78vh]"
        >
          <input
            type="text"
            name="description"
            placeholder="Search for places"
            required
            className=" px-4 py-2 border block mx-auto rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={handleSearchChange}
          />
          <Button type="button" className="w-3/4">
            Search
          </Button>
          <div className="flex flex-col items-center w-60 overflow-y-hidden gap-1 h-3/4 mt-2">
            {location?.map((loc) => (
              <button
                type="button"
                key={loc.place_id}
                onClick={() => {
                  setCurrentPosition([
                    parseFloat(loc.lat),
                    parseFloat(loc.lon),
                  ]);
                  console.log(currentPosition);
                }}
                className="bg-gray-400 text-black rounded-md w-full h-16"
              >
                {loc.display_name}
              </button>
            ))}
          </div>
        </form>
        <div className="w-full">
          <Map
            isPreview={false}
            handleChange={handleChange}
            marker={currentPosition}
            classname="w-3/4 mx-auto h-full"
            setSelectedLocation={setSelectedLocation}
          />
          <div className="flex flex-col">
            <h3>Selected Location:</h3>
            <p className="text-xl">{selectedLocation}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Map;
