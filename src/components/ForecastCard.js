import Card from "./UI/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudBolt, faCloudRain, faCloudShowersHeavy, faSmog, faSnowflake, faSun, faX } from "@fortawesome/free-solid-svg-icons";

const ForecastCard = (props) => {
  const date = new Date(props.data.dt * 1000);
  const weatherId = props.data.weather[0].id;
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]; 
  let icon;
  if(weatherId>=200 && weatherId<300){
    icon = faCloudBolt;
  } else if(weatherId>=300 && weatherId<500){
    icon = faCloudRain;
  } else if (weatherId>=500 && weatherId<600){
    icon = faCloudShowersHeavy;
  } else if (weatherId>=600 && weatherId<700){
    icon = faSnowflake;
  } else if (weatherId>=700 && weatherId<800){
    icon = faSmog;
  } else if (weatherId===800) {
    icon = faSun;
  } else if (weatherId>800 && weatherId<900){
    icon = faCloud;
  } else {
    icon = faX;
  }
  return (
    <Card>
      <div>
        <h1>{weekday[date.getUTCDay()]}</h1>
        <p>{month[date.getUTCMonth()]} {date.getUTCDate()}, {date.getUTCHours()}:00</p>
        <h1>{Math.round(props.data.main.temp)} °C</h1>
        <FontAwesomeIcon icon={icon} size="3x" />
        <p style={{ fontWeight: "bold" }}>{props.data.weather[0].description}</p>
      </div>
    </Card>
  );
};

export default ForecastCard;
