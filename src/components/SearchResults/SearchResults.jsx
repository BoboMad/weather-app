import ListGroup from 'react-bootstrap/ListGroup';
import React, {useState } from 'react';
import styles from './SearchResults.module.css';


const SearchResult = ({geoData, SetGeoLocation, inputFocus}) => {

    const handleOnClick = (location) =>{
        SetGeoLocation([{lat: location.lat, lon: location.lon}]);
    }


  return (
    <>
    {inputFocus && (
    <ListGroup className={styles.locationList}>
        
        {geoData.map((location, id) => (
        <ListGroup.Item 
        className={styles.listItem} 
        key={id} 
        onClick={() => handleOnClick(location)}>

            {location.name}, {location.country}
        
        </ListGroup.Item>
        ))}
    </ListGroup>
    )}
    </>
  );
}



export default SearchResult;