import { Button, Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { REQUEST_PATH_SHORTLINK } from '../../constants/Variables';
import { URL_SHORTENER_API_HOST_DEV } from '../../constants/URLs';
import { getUrlKey } from '../../services/UrlKeyService';
import Alert from 'react-bootstrap/Alert';
import CAlert from './CAlert';
import { postShortUrls } from "../../services/ShortUrlService";

const CShortUrlAdd = () => {


    const [extraLanguagePartItems, setExtraLanguagePartItems] = useState([]);
    const [languageAndCountryCode, setLanguageAndCountryCode] = useState('');
    const [originalURL, setOriginalURL] = useState('');
    const [urlKey, setUrlKey] = useState('');

  const [alerts, setAlerts] = useState([]);

  const [productName, setProductName] = useState('-1');
  
 
  const onAddLanguageItem = () => {
    let newExtraLanguagePartItems = [...extraLanguagePartItems];
    newExtraLanguagePartItems.push({languageAndCountryCode: "", originalURL: ""});
    setExtraLanguagePartItems(newExtraLanguagePartItems);
  }

  const onRemoveLanguageItem = () => {
    let newExtraLanguagePartItems = [...extraLanguagePartItems]
    newExtraLanguagePartItems.pop()
    setExtraLanguagePartItems(newExtraLanguagePartItems)
  }

  const onClickForGeneratingUrlKey = () => {
    if (productName === '-1') {
        alert('Please choose a product name');
        return;
        }

    getUrlKey(productName).then((data) => {
      setUrlKey(data);
      console.log(data);
    });
  }

  const handleChange = (idx, e) => {
    extraLanguagePartItems[idx][e.target.name] = e.target.value;
  }
  
  const addOneMoreLanguage = (idx) => {
    return (
        <Form.Group key={idx} as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Col sm={3}>
        <Form.Control type="text" placeholder="Language Code" name="languageAndCountryCode" required  onChange={e => handleChange(idx, e)}/>
        </Col>
        <Col sm={7}>
        <Form.Control type="text" placeholder="Original URL" name='originalURL' required  onChange={e => handleChange(idx, e)}/>
        </Col> 
        <Col sm={2}>
        <Button variant="danger" onClick={onRemoveLanguageItem}>Remove</Button>{' '}
        </Col>
    </Form.Group>

    )
  }

  const saveShortUrl = () => {
    console.log("p:::" + JSON.stringify(extraLanguagePartItems));
    if (productName === '-1') {
        alert('Please choose a product name');
        return;
        }

    if (urlKey === '') {
        alert('Please generate a short code');
        return;
        }

    if (languageAndCountryCode === '' || originalURL === '') {
        alert('Please input language code and original URL');
        return;
    }


    for (let i = 0; i < extraLanguagePartItems.length; i++) {
        if (extraLanguagePartItems[i].languageAndCountryCode === '' || extraLanguagePartItems[i].originalURL === '') {
            alert('Please input language code and original URL');
        return;
        }
    }

    let tempData = {[languageAndCountryCode]: originalURL};
    for (let i = 0; i < extraLanguagePartItems.length; i++) {
        tempData[extraLanguagePartItems[i].languageAndCountryCode] = extraLanguagePartItems[i].originalURL;
    }    
    postShortUrls(productName, urlKey, tempData).then((data) => {
        console.log(data);
        if (data.status === 200) {
            setAlerts([{
                variant: 'success',
                message: 'Successfully saved'
            }]);
        } else {
            setAlerts([{
                variant: 'danger',
                message: 'Failed to save'
            }]);
        }
        window.location.reload(); 
    }
    );
  }

  


  return  (
    <Row className="justify-content-md-center">
    <Col xs lg="7">
    <Form bg='Danger'>
      
      
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={4}>
          Product Name
        </Form.Label>
        <Col sm={8}>
        <Form.Select aria-label="Default select example" onChange={(e) => {
            setProductName(e.target.value);
            console.log("choose: " + e.target.value);
        }}>
 
        <option value="-1">Choose a product name</option>
      <option value="polices">polices</option>
      <option value="privacy">privacy</option>
      <option value="helper">helper</option>
      <option value="how-to">how-to</option>
      <option value="faq">faq</option>
      <option value="term">term</option>
    </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
        <Form.Label column sm={4}>
          Short Code
        </Form.Label>
        <Col sm={6}>
          <Form.Control type="text" disabled placeholder="Custom Code" value={urlKey} onChange={(event) => setUrlKey(event.target.value)} />
        </Col>
        <Col sm={2}>
            <Button variant="success" onClick={onClickForGeneratingUrlKey}>Generate</Button>
        </Col>
      </Form.Group>
        
        <br></br>
      
      <Alert variant='primary'>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <Col sm={3}>
            <Form.Control type="text" placeholder="Language Code" required value={languageAndCountryCode} onChange={(event) => setLanguageAndCountryCode(event.target.value)}/>
            </Col>
            <Col sm={7}>
            <Form.Control type="text" placeholder="Original URL" required value={originalURL}  onChange={(event) => setOriginalURL(event.target.value)}/>
            </Col> 
        </Form.Group>

        
        {extraLanguagePartItems.map((_, idx) => addOneMoreLanguage(idx))}
      </Alert>


      <Form.Group as={Row} >
        <Col sm={{ offset: 4 }}>
          <Button type="button" variant='success' onClick={onAddLanguageItem}>Add One More Language</Button>
        </Col>
        <Col>
          <Button type="button" onClick={saveShortUrl}>Submit</Button>
        </Col>
      </Form.Group>
    </Form>
    </Col>
    </Row>
  );
};

export default CShortUrlAdd;