import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

const AccordionComponent =  (props) => {
    return(


        <Accordion>
            <Accordion.Item eventKey ="0">
                <Accordion.Header>Hello world</Accordion.Header>
                <Accordion.Body>
                    Test
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>

    );
}

export default AccordionComponent;