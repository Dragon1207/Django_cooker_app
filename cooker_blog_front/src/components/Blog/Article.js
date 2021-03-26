import React from 'react';
import { Link } from "react-router-dom";
import {  Container, Grid, Typography} from '@material-ui/core';
import Meta from './Meta';
import Ingredient from './Ingredient';

export default function Post(props) {
  const { data, error } = props;
  const meta = {
    date:data.published, 
    author:data.author
  }
  return (
    <>
      <Container maxWidth="lg" style={{marginBottom:'4%'}}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid md={3} lg={3} item>
            <Ingredient data={data.ingredient}/>
          </Grid>
          <Grid item lg={9} sm zeroMinWidth>
          <Link to={'/post/'+ data.id}><h3>{data.title}</h3></Link>
          <Typography noWrap>{data.content}</Typography><Link to={'/post/'+ data.id}>Lire plus</Link>
            <Meta data={meta}/>
            </Grid>
        </Grid>
      </Container>
    </>
  );
}
