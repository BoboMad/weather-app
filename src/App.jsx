import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResults/SearchResults';
import React, {useState} from 'react';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import AccordionComponent from './components/Accordion/AccordionComponent';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {

    const [geoData, SetGeoData] = useState([]);
    const [geoLocation, SetGeoLocation] = useState([{lat: 59.3251172, lon:18.0710935}])
    const [inputFocus, setInputFocus] = useState(false);

  return (
    <Container className='w-50'>
      <Row>
        <Col>
          <SearchBar SetGeoData={SetGeoData} setInputFocus={setInputFocus}/>
        </Col>
      </Row>

      <Row className='position-relative'>
        <Col>
          <SearchResult geoData={geoData} SetGeoLocation={SetGeoLocation} inputFocus={inputFocus}/>
        </Col>
      </Row>

      <Row>
        <Col>
          <CurrentWeather geoLocation={geoLocation}/>
        </Col>
      </Row>
      
      <Row>
        <Col>
          <AccordionComponent geoLocation={geoLocation} />
        </Col>
      </Row>
      </Container>
  );
}

export default App
