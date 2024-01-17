import React, { useEffect, useState } from 'react'
import {Container, Accordion, Row, Col} from 'react-bootstrap'

import { BsThermometerHalf, BsClock, BsSpeedometer, BsDroplet, BsThermometerSun, BsCloudSun, BsWind, BsSunrise } from "react-icons/bs";

const AccordionComponent =  ({geoLocation}) => {
    
    const [foreCastData, setForeCastData] = useState(null)

    const fetchForecastData = async (location) =>{
        const apiKey = "33af9d4a83054683b3793432241601"
        
        try{
            const response = await fetch (`http://api.weatherapi.com/v1/forecast.json?key=${apiKey} &q=${location[0].lat},${location[0].lon}&days=7&aqi=no&alerts=no`);
            const json = await response.json();
            console.log("forecast object",json)
            setForeCastData(json);
        }
        catch(error){
            console.error('error fetching forecast data', error)
        }
    }

    useEffect(()=>{
        fetchForecastData(geoLocation);
    }, [geoLocation])

    const formatDate = (dateString) => {
        const options = { weekday: 'long' };
        const date = new Date(dateString);
        const today = new Date();

        if(date.getDate() === today.getDate())
            return 'Today'
        else if(date.getDate() === today.getDate() + 1)
            return 'Tomorrow'
        else
            return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    return(
        <>
            {foreCastData && (
                foreCastData.forecast.forecastday.map((day, index) =>(
                    <Accordion key={index} defaultActiveKey="1" className='p-1'>
                        <Accordion.Item>
                            <Accordion.Header>
                                <Container>
                                    <Row>
                                        <Col>
                                            <img src={day.day.condition.icon} alt="forcast-img" />
                                            {<h3>{formatDate(day.date)}</h3>}
                                        </Col>
                                        <Col>
                                            <BsThermometerHalf id="thermo-icon" />
                                            <p>Temp (c)</p>
                                            <p>Max: {Math.round(day.day.maxtemp_c)}°</p>
                                            <p>Min: {Math.round(day.day.mintemp_c)}°</p>
                                        </Col>
                                        <Col>
                                            <BsWind/>
                                            <p>Max wind speed (km/h)</p>
                                            <p>{day.day.maxwind_mph} </p>
                                        </Col>

                                        <Col>
                                            <BsSunrise/>
                                            <p>Sunrise</p>
                                            <p>{day.astro.sunrise.split(' ')[0]}</p>
                                        </Col>
                                    </Row>
                                </Container>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Container>
                                    <Row>
                                    <Col>
                                            <BsClock id="clock-icon"/>
                                            <p>Time</p>
                                        </Col>
                                        <Col>
                                            <BsCloudSun id="weather-icon"/>
                                            <p>Weather</p>
                                        </Col>
                                        <Col>
                                            <BsThermometerHalf id="thermo-icon" />
                                            <p>Temp</p>
                                        </Col>
                                        <Col>
                                            <BsThermometerSun/>
                                            <p>Feels Like</p>
                                        </Col>
                                        <Col>
                                            <BsDroplet/>
                                            <p>Humidity</p>
                                        </Col>
                                        <Col>
                                            <BsSpeedometer id="pressure-icon"/>
                                            <p>Pressure hPa</p>
                                        </Col>
                                    </Row>

                                    {day.hour.map((hour, hourIndex)=>(
                                        <Row key={hourIndex} className='border-bottom border-dark'>
                                        <Col>
                                            <p>{hour.time.split(' ')[1].split(':')[0]}</p>
                                        </Col>

                                        <Col>
                                            <img src={hour.condition.icon} alt="forcast-img" />
                                        </Col>

                                        <Col>
                                            <p>{Math.round(hour.temp_c)} °</p>
                                        </Col>

                                        <Col>
                                            <p>{Math.round(hour.feelslike_c)} °</p>
                                        </Col>

                                        <Col>
                                            <p>{hour.humidity} %</p>
                                        </Col>

                                        <Col>
                                            <p>{Math.round(hour.pressure_mb)}</p>
                                        </Col>
                                    </Row>
                                    ))}
                                    
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            )}
        </>
    );
}

export default AccordionComponent;
