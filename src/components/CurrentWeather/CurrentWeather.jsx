import { useEffect, useState } from "react";


const CurrentWeather = ({geoLocation}) =>{

    const [currentWeather, setCurrentWeather] = useState(null);

    const fetchCurrentWeatherData = async (geoLocation) =>{
        const apiKey = "33af9d4a83054683b3793432241601"

         try{
            console.log("GeoLocation när den kommer in: ", geoLocation)
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${geoLocation[0].lat},${geoLocation[0].lon}&aqi=no}`);
            const json = await response.json();
            console.log("Json objectet efter fetch:",json);
            setCurrentWeather(json);

         }
         catch(error){
            console.error('Error fetching weather data', error);
         }
        
    }

    useEffect(() =>{
        fetchCurrentWeatherData(geoLocation);
    }, [geoLocation]);

    useEffect(() => {
        console.log("current weather: ", currentWeather);
      }, [currentWeather]);


    return(
        <>
        {currentWeather && (
        <div className="currentWeatherWrapper">
            <div className="weatherIcon">
                <img src={currentWeather.current.condition.icon}
                    alt="weather-icon" 
                />
                <p>{}</p>
            </div>
            <div className="currentWeatherTemp">
                <p>Current Weather</p>
                <p>Location: {currentWeather.location.name}</p>
                <p>Temp: {currentWeather.current.temp_c}</p>
                <p>Feels like: {currentWeather.current.feelslike_c}</p>
                <p>Humidity: {currentWeather.current.humidity}%</p>
                <p>Wind: {currentWeather.current.wind_kph} km/h</p>
                <p>Pressure: {currentWeather.current.pressure_mb} hpa</p>

            </div>
        </div>
        )}
    </>
    );
}

export default CurrentWeather;
