import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import React, { useEffect, useState } from "react";

export default function CAlert(variant, message) {
    const [showElement,setShowElement] = useState(true)

    useEffect(()=>{
        setTimeout(function() {
          setShowElement(false)
             }, 3000);
           },
       [])

    return (
        <Row>
            {showElement? <Alert variant={variant}>
            {message}
            </Alert>:<></>}            
        </Row>
    );
}