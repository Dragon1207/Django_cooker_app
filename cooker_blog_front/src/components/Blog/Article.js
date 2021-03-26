import React from 'react';
import {  Container, Grid} from '@material-ui/core';
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
        <Grid container spacing={2}>
          <Grid lg={3} item>
            <Ingredient data={data.ingredient}/>
          </Grid>
          <Grid item lg={9} sm container>
            <Grid item xs container zeroMinWidth direction="column" spacing={2}>
              <a href={data.link}><h3>{data.title}</h3></a>
              <p>{data.content}...<a href={data.link}>Lire plus</a></p>
              <Meta data={meta}/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
