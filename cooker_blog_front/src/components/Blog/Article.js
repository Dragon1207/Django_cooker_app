import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Container} from '@material-ui/core';
import Meta from './Meta';

export default function Post(props) {
  const { data, error } = props;
  return (
    <>
      <Container>
        <Row>
          <Col xs md='3' lg='3' className="post-thumbnail" >
            <img src={data.img} alt={data.title}/>
          </Col>
          <Col xs md='9' lg='9' className="content">
            <a href={data.link}><h3>{data.title}</h3></a>
            <p>{data.excerpt}...<a href={data.link}>Lire plus</a></p>
          </Col>
        </Row>
        <Meta data={data.meta}/>
      </Container>
    </>
  );
}
