import { useState } from "react";
import "./App.css";
import RenderMeteo from "./components/RenderMeteo/RenderMeteo";
import LocationUser from "./components/LocationUser/LocationUser";

function App() {
   const [meteo, setMeteo] = useState([]);
   const [city, setCity] = useState("");
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

   const handleInputCity = (e) => {
      setCity(e.target.value);
   };

   const getMeteo = async () => {
      let response;
      if (showDataUser === false) {
         response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&lang=fr&lat=${lat}&lon=${long}&appid=282885f571a4a2f45b3c08ff172d69d1&units=metric`);
         const data = await response.json();
         setMeteo(data.list);
      } else {
         response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=fr&appid=282885f571a4a2f45b3c08ff172d69d1&units=metric`);
         const data = await response.json();
         setMeteo(data.list);
      }
   };
   console.log(meteo);

   const renderMeteo = () => {
      return meteo?.map((element, index) => {
         return (
            <div key={index}>
               <RenderMeteo
                  hour={element.dt_txt}
                  tempMin={element.main.temp_min}
                  tempMax={element.main.temp_max}
                  speedWind={element.wind.speed}
                  humidity={element.main.humidity}
                  description={element.weather[0].description}
                  icon={element.weather[0].icon}
               />
            </div>
         );
      });
   };

   return (
      <>
         <h1 className="title">La meteo de Nono</h1>
         <div className="card">
            <div className="search">
               <button onClick={toggleShowDataUser}>
                  <img src="images/change.png" />
               </button>
               {showDataUser ? (
                  <>
                     <input onChange={handleInputCity} type="text" placeholder="Entrer la ville" spellCheck="false" />
                     <button onClick={getMeteo}>
                        <img src="images/search.png" />
                     </button>
                  </>
               ) : (
                  <>
                     <LocationUser onLocationChange={handleLocationChange} />
                     <input type="text" placeholder="Votre position actuelle" spellCheck="false" readonly="readonly" />
                     <button onClick={getMeteo}>
                        <img src="images/search.png" />
                     </button>
                  </>
               )}
            </div>
         </div>
         {renderMeteo()}
      </>
   );
}

export default App;
