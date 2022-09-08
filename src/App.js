import React, { useCallback, useState, useEffect } from "react";
import { locationService } from "./services/geolocation.service";
import Header from "./components/Header";
import ForecastCard from "./components/ForecastCard";
import LocationDisplay from "./components/LocationDisplay";
import classes from "./App.module.css";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    const local = await locationService.getCoords()
    const lat = local.lat;
    const lon = local.lon;
    if (local) {
      const cache = sessionStorage.getItem(`${lat}-${lon}`);
      if (cache && cache.cacheExpireAt > Date.now()) {
        setData(cache.data);
        setIsLoading(false);
      } else {
        try {
          //IMPORTANT: Set the API key before using the app in the line below
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=xxxxxxxx&units=metric`
          );
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
          const parsedResponse = await response.json();
          sessionStorage.setItem(
            `${lat}-${lon}`,
            {
              data: parsedResponse,
              cacheExpireAt: parsedResponse.list[1].dt * 1000,
            }
          );
          setData(parsedResponse);
        } catch (error) {
          setError(error.message);
        }
        setIsLoading(false);
      }
    } else {
      setError(
        "Failed to determine your location. Please check your browser settings and try again."
      );
      setIsLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return (
    <React.Fragment>
      <Header />
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && (
        <React.Fragment>
          <LocationDisplay location={data.city} />
          <div className={classes["cards-box"]}>
            <ForecastCard data={data.list[1]} />
            <ForecastCard data={data.list[9]} />
            <ForecastCard data={data.list[17]} />
            <ForecastCard data={data.list[28]} />
            <ForecastCard data={data.list[36]} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default App;
