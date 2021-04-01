import React from 'react';
import { Link } from "react-router-dom";
import {  Container, Grid, Typography} from '@material-ui/core';
import Meta from './Meta';
import Ingredient from './Ingredient';

export default function Post(props) {
  const { data, error } = props;
  const meta = {
    date:data.published, 
    author:data.author.first_name+" "+data.author.last_name
  }
  return (
    <>
      <Container maxWidth="lg" style={{marginBottom:'4%'}}>
        <Grid container spacing={2}>
          <Grid sm={3} md={3} lg={3} item>
            <Ingredient data={data.ingredient}/>
          </Grid>
          <Grid item xs sm={9} md={9} lg={9} zeroMinWidth>
          <Link to={'/post/'+ data.id}><h3>{data.title}</h3></Link>
          <Typography noWrap>{data.content}</Typography><Link to={'/post/'+ data.id}>Lire plus</Link>
            <Meta data={meta}/>
            </Grid>
        </Grid>
      </Container>
    </>
  );
}
