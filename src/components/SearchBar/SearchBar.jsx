import { useState } from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import {FaSearch} from 'react-icons/fa';


const SearchBar = ({SetGeoData, setInputFocus}) => {

    const [input, setInput] = useState('');

    const fetchGeoData = async (cityName) =>{

        const apiKey = "33af9d4a83054683b3793432241601";
        try{
        const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=${apiKey} &q=${cityName}`);
        const json = await response.json();
        SetGeoData(json);
        }
        catch(error){
            console.error('error fetching geo data', error)
        }
        
    }

    const handleChange = (cityName) => {
        setInput(cityName);
        cityName.trim() !=='' ? fetchGeoData(cityName) : SetGeoData([]);
    }

    const handleFocus = () =>{
        setInputFocus(true);
    }

    const handleBlur = () =>{
            setTimeout(()=>{
                setInputFocus(false);
            },200)
     }

    return(
        <Container className='mt-5'>
            <Row className='mb-3'>
                <Col>
                    <Form className='d-flex'>
                        <Form.Control 
                        type = 'search'
                        placeholder='Enter city'
                        className='me-2 rounded-pill'
                        aria-label='Search'
                        value={input}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                        />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default SearchBar;

            // <input placeholder='Enter city...' 
            //     value={input}
            //     onFocus={handleFocus}
            //     onBlur={handleBlur}
            //     onChange={(e) => handleChange(e.target.value)}>
            // </input>
            // <FaSearch id='Search-icon'/>