import { useEffect, useState } from "react";
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsThermometerHalf, BsClock, BsSpeedometer, BsDroplet, BsThermometerSun, BsCloudSun, BsWind, BsSunrise } from "react-icons/bs";
import styles from './currentWeather.module.css'

const CurrentWeather = ({geoLocation}) =>{

    const [currentWeather, setCurrentWeather] = useState(null);

    const fetchCurrentWeatherData = async (geoLocation) =>{
        const apiKey = "33af9d4a83054683b3793432241601"

         try{
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${geoLocation[0].lat},${geoLocation[0].lon}&aqi=no}`);
            const json = await response.json();
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
            <Container className={styles.currentWeatherContainer}>
                <Row className={styles.row}>
                    <Col>
                        <h3>Current weather</h3>
                        <img src={currentWeather.current.condition.icon} alt="weather-icon" />
                        <h4>{currentWeather.location.name}</h4>
                        <div className={styles.row}>
                            <BsThermometerHalf className={styles.BsThermometerHalf}/>
                            <p className={styles.text}>Temp: {currentWeather.current.temp_c}°</p>
                        </div>
                    </Col>
                    
                    <Col>
                    <div className={styles.row}>
                        <BsThermometerSun className={styles.icon}/>
                        <p className={styles.text}>Feels like: {currentWeather.current.feelslike_c}°</p>
                    </div >
                    
                    <div className={styles.row}>
                        <BsDroplet className={styles.icon}/>
                        <p className={styles.text}>Humidity: {currentWeather.current.humidity}%</p>
                    </div>
                    
                    <div className={styles.row}>
                        <BsWind className={styles.icon}/>
                        <p className={styles.text}>Wind: {currentWeather.current.wind_kph} km/h</p>
                    </div >
                    
                    <div className={styles.row}>
                        <BsSpeedometer className={styles.icon}/>
                        <p className={styles.text}>Pressure: {currentWeather.current.pressure_mb} hpa</p>
                    </div>
                      
                    </Col>

                </Row>
            </Container>

        )}
    </>
    );
}

export default CurrentWeather;
