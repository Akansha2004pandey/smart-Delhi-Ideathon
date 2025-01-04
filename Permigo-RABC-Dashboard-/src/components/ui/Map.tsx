import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// Red icon for current location
const customIconElement = L.divIcon({
  html: `<div class='relative w-10 h-10 flex items-center justify-center'>
            <div class='absolute w-full h-full bg-red-600 rounded-full animate-ping opacity-75'></div>
            <MdLocationOn class='text-red-600 text-3xl' />
          </div>`,
  iconSize: [10, 10],
  className: "custom-marker-icon",
});

// Blue icon for user markers
const blueIconElement = L.divIcon({
  html: `<div class='relative w-10 h-10 flex items-center justify-center'>
            <div class='absolute w-full h-full bg-blue-600 rounded-full opacity-75'></div>
            <MdLocationOn class='text-blue-600 text-3xl' />
          </div>`,
  iconSize: [20, 20],
  className: "custom-marker-icon",
});

const Map: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const map = L.map("map").setView([0, 0], 2); // Default world view

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.latitude, position.coords.longitude];
          map.setView(location, 15);
          L.marker(location, { icon: customIconElement })
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    }

    users.forEach((user) => {
      const { latitude, longitude, name, email, status } = user;
      if (latitude && longitude) {
        L.marker([parseFloat(latitude), parseFloat(longitude)], { icon: blueIconElement })
          .addTo(map)
          .bindPopup(
            `<strong>${name}</strong><br>Email: ${email}<br>Status: ${status}`
          );
      }
    });

    L.control.scale().addTo(map);
    L.control.zoom({ position: "topright" }).addTo(map);

    const locateButton = L.control({ position: "bottomright" });
    locateButton.onAdd = function () {
      const button = L.DomUtil.create("button", "locate-button");
      button.innerText = "Locate Me";
      button.className = "bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600";
      button.onclick = () => {
        map.locate({ setView: true, maxZoom: 15 });
      };
      return button;
    };
    locateButton.addTo(map);

    map.on("locationfound", (e) => {
      L.marker([e.latlng.lat, e.latlng.lng], { icon: customIconElement })
        .addTo(map)
        .bindPopup("You are here")
        .openPopup();
    });

    map.on("locationerror", () => {
      alert("Unable to retrieve your location");
    });

    return () => {
      map.remove();
    };
  }, [users]);

  return (
    <div>
      <div id="map" className="h-[35rem] w-[100%] mb-4 rounded-lg shadow-md"></div>
      <style>{`
        .custom-marker-icon {
          transform: translate(-50%, -100%);
        }
      `}</style>
    </div>
  );
};

export default Map;
