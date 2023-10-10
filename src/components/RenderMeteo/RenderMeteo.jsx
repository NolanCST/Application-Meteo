import "./RenderMeteo.css";

function RenderMeteo(props) {
   const icon = `https://openweathermap.org/img/wn/${props.icon}@2x.png`;
   const speedWind = `${props.speedWind}` * 1.6;
   return (
      <>
         <div className="meteoContainer">
            <div className="weather">
               <h3 className="hour">{props.hour}</h3>
               <img src={icon} className="weatherIcons" alt="weatherIcons" />
               <h2 className="description">{props.description}</h2>
               <div className="temp">
                  <h1 className="tempMin">Min: {props.tempMin}°C</h1>
                  <h1 className="tempMax">Max: {props.tempMax}°C</h1>
               </div>
               <div className="details">
                  <div className="col">
                     <img src="images/wind.png" className="detailsIcons" alt="windIcon" />
                     <div className="wind">
                        <p>{speedWind.toFixed(2)} km/h</p>
                        <p>Vitesse du vent</p>
                     </div>
                  </div>
                  <div className="col">
                     <img src="images/humidity.png" className="detailsIcons" alt="windIcon" />
                     <div className="humidity">
                        <p>{props.humidity} %</p>
                        <p>Humidite</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
export default RenderMeteo;
