import React, { useEffect, useState } from "react";
import { useShortUrlData } from "../hooks/ShortUrlHook";
import Container from 'react-bootstrap/Container';
import CLoading from "../components/common/CLoading";
import CShortUrlCard from"../components/common/CShortUrlCard";
import CShortUrlAdd from"../components/common/CShortUrlAdd";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const VShortUrls = () => {
  const shortUrls = useShortUrlData({
    initialData: undefined
  });
  const [currShortUrls, setShortUrls] = useState();

  useEffect(() => {
    setShortUrls(shortUrls);
  }, [shortUrls]);

  return currShortUrls === undefined || currShortUrls === null ? (
    <CLoading />
  ) : (
    <Container>
      <Row>
        <Col>
          <h1>Turo URL Shortener</h1>
        </Col>
      </Row>

    <br/>
    <br/>

    <CShortUrlAdd />

    <br/>
    <br/>

    <hr></hr>

    <br/>
    <br/>
      {
        currShortUrls.map((each, index) => {
          console.log(each);
          return <CShortUrlCard shortUrl={each} key={index}/>
        })
      }
    </Container>
  );
};

export default VShortUrls;
