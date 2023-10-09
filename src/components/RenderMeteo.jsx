function RenderMeteo(props) {
   const icon = `https://openweathermap.org/img/wn/${props.icon}@2x.png`;
   const speedWind = `${props.speedWind}` * 1.6;
   return (
      <>
         <div className="meteoContainer">
            <p>
               Horaire: {props.hour} | Temp Min: {props.tempMin}°C | Temp Max: {props.tempMax}°C | Vent: {speedWind.toFixed(2)} Km/H | Description: {props.description}
            </p>
            <img src={icon} />
         </div>
      </>
   );
}
export default RenderMeteo;
