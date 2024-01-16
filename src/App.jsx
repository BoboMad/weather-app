import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import SearchBar from './components/SearchBar/SearchBar';
import SearchResult from './components/SearchResults/SearchResults';
import React, {useState} from 'react';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';

function App() {

    const [geoData, SetGeoData] = useState([]);
    const [geoLocation, SetGeoLocation] = useState([{lat: 59.3251172, lon:18.0710935}])
    const [inputFocus, setInputFocus] = useState(false);

  return (
    <>
      <SearchBar SetGeoData={SetGeoData} setInputFocus={setInputFocus}/>
      <SearchResult geoData={geoData} SetGeoLocation={SetGeoLocation} inputFocus={inputFocus}/>
      <CurrentWeather geoLocation={geoLocation}/>
    </>
  );
}

export default App
