import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Form } from 'react-bootstrap';
import { FiCopy } from 'react-icons/fi';
import { MdAdd, MdOpenInNew, MdRemove } from 'react-icons/md';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { REQUEST_PATH_SHORTLINK } from '../../constants/Variables';
import { URL_SHORTENER_API_HOST_DEV } from '../../constants/URLs';
import { deleteShortUrl } from "../../services/ShortUrlService";

/**
 * FlexCal card Component which represents a flexcal.
 * Including information like titles, descriptions, invitation link.
 * This component also allows for adding attendess to customize invitation link. 
 * @param {*} props expected fields: edit URL, start date, name
 */
const CShortUrlCard = (shortUrl) => {

  return (
   <Row className="justify-content-md-center">
    <Col xs lg="8">
      {Object.entries(shortUrl).map(([key, value]) => (
        <Card key={key}>
          <Card.Body>
            {Object.entries(value).map(([shortPath, originalUrls]) => (
              <div key={shortPath}>
                <Card.Title>
                  <Row>
                    <Col lg='8'>
                    <a href={`${URL_SHORTENER_API_HOST_DEV}/${REQUEST_PATH_SHORTLINK}/${shortPath}` } target="_blank">{shortPath}</a>
                    </Col>
                    <Col lg='2'>
                    <Button variant='primary' onClick={() => {
         navigator.clipboard.writeText(`${URL_SHORTENER_API_HOST_DEV}/${REQUEST_PATH_SHORTLINK}/${shortPath}`);}}>Copy</Button>
                    </Col>
                    <Col lg='2'>
                    <Button variant='danger' onClick={() => {

                      deleteShortUrl(`${shortPath}`).then(() => {
                        window.location.reload();
                      });

                    }}>Delete</Button>
                    </Col>
                  </Row>
                </Card.Title>
                <ListGroup className="list-group-flush">
                {Object.entries(originalUrls).map(([country, link]) => (
                   <ListGroup.Item key={country}>
          
                        {country}: <a href={link} target="_blank">{link}</a>
    
                      </ListGroup.Item>
                    ))}
                </ListGroup>
                

              </div>
            ))}
          </Card.Body>
        </Card>
      ))}
      </Col>
    </Row> 
  );
};

export default CShortUrlCard;