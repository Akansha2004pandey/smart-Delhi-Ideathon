import React, { useEffect,useMemo,useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store";
import { fetchCameras } from "../../store/slices/cameraSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

// Green icon for current location
const greenIconElement = L.divIcon({
  html: `<div class='relative w-10 h-10 flex items-center justify-center'>
            <div class='absolute w-full h-full bg-green-600 rounded-full animate-ping opacity-75'></div>
            <div class='text-green-600 text-3xl'>📍</div>
          </div>`,
  iconSize: [20, 20],
  className: "custom-marker-icon",
});

// Blue icon for active users
const activeUserIcon = L.divIcon({
  html: `<div class='relative w-10 h-10 flex items-center justify-center'>
            <div class='absolute w-full h-full bg-blue-600 rounded-full opacity-75'></div>
            <div class='text-blue-600 text-3xl'>📍</div>
          </div>`,
  iconSize: [20, 20],
  className: "custom-marker-icon",
});

// Red icon for inactive users
const inactiveUserIcon = L.divIcon({
  html: `<div class='relative w-10 h-10 flex items-center justify-center'>
            <div class='absolute w-full h-full bg-red-600 rounded-full opacity-75'></div>
            <div class='text-red-600 text-3xl'>📍</div>
          </div>`,
  iconSize: [20, 20],
  className: "custom-marker-icon",
});

const Map: React.FC = () => {
  const cameras = useSelector((state: RootState) => state.cameras.cameras);
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, any>>();

    const currentOrganization = useMemo(
      () => JSON.parse(localStorage.getItem('currentOrganization') || '{}'),
      []
    );
    

      useEffect(() => {
        if (currentOrganization?.uid) {
          dispatch(fetchCameras(currentOrganization.uid));
        }
      }, [dispatch, currentOrganization?.uid]);




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
          L.marker(location, { icon: greenIconElement })
            .addTo(map)
            .bindPopup("You are here")
            .openPopup();
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    }


    cameras.forEach((user) => {
      const { latitude, longitude, name, email, status } = user;
      if (latitude && longitude) {
        const icon = status === "active" ? activeUserIcon : inactiveUserIcon;
        L.marker([parseFloat(latitude), parseFloat(longitude)], { icon })
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
      L.marker([e.latlng.lat, e.latlng.lng], { icon: greenIconElement })
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
  }, [cameras]);

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
