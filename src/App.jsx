import { useState } from "react";
import "./App.css";
import RenderMeteo from "./components/RenderMeteo/RenderMeteo";
import LocationUser from "./components/LocationUser/LocationUser";

function App() {
   const [meteo, setMeteo] = useState([]);
   const [lat, setLat] = useState("");
   const [long, setLong] = useState("");
   const [showDataUser, setShowDataUser] = useState(false);

   const handleLocationChange = (latitude, longitude) => {
      setLat(latitude);
      setLong(longitude);
   };

   const toggleShowDataUser = () => {
      setShowDataUser(!showDataUser);
      setMeteo([]);
   };

   const handleInputLat = (e) => {
      setLat(e.target.value);
   };

   const handleInputLong = (e) => {
      setLong(e.target.value);
   };

   const getMeteo = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&lang=fr&lat=${lat}&lon=${long}&appid=282885f571a4a2f45b3c08ff172d69d1&units=metric`);
      const data = await response.json();
      console.log(data.list);
      setMeteo(data.list);
   };

   const renderMeteo = () => {
      return meteo?.map((element, index) => {
         return (
            <div key={index}>
               <RenderMeteo hour={element.dt_txt} tempMin={element.main.temp_min} tempMax={element.main.temp_max} speedWind={element.wind.speed} description={element.weather[0].description} icon={element.weather[0].icon} />
            </div>
         );
      });
   };

   return (
      <>
         <h1>La meteo de Nono</h1>
         <div>
            <button onClick={toggleShowDataUser}>{showDataUser ? "Votre position actuelle" : "Choisir les coordonnees"}</button>
            {showDataUser ? (
               <>
                  <input onChange={handleInputLat} className="latitudeInput" type="number" placeholder="latitude" max="90" min="-90" />
                  <input onChange={handleInputLong} className="longitudeInput" type="number" placeholder="longitude" max="180" min="-180" />
               </>
            ) : (
               <LocationUser onLocationChange={handleLocationChange} />
            )}
            <button onClick={getMeteo}>Rechercher</button>
            {renderMeteo()}
         </div>
      </>
   );
}

export default App;
