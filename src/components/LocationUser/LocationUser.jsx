import { useEffect, useState } from "react";

const LocationUser = ({ onLocationChange }) => {
   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const userLatitude = position.coords.latitude;
               const userLongitude = position.coords.longitude;
               setLatitude(userLatitude);
               setLongitude(userLongitude);
               onLocationChange(userLatitude, userLongitude);
            },
            (error) => {
               console.error(error);
            }
         );
      } else {
         console.error("Geolocation is not supported by this browser.");
      }
   }, [onLocationChange]);

   return;
};

export default LocationUser;
