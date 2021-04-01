import React from 'react';
import { Container, Grid} from '@material-ui/core';
import Meta from './Meta';
import Ingredient from './Ingredient';

export default function Single(props) {
  const { data, error } = props;
  const meta = {
    date:data.published, 
    author:data.author?.first_name+" "+data.author?.last_name
  }
  return (
    <>
      <Container maxWidth="lg" style={{marginBottom:'4%'}}>
        <Grid container spacing={2}>
          <Grid lg={3} item>
            <Ingredient data={data.ingredient}/>
          </Grid>
          <Grid item lg={9} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <h3>{data.title}</h3>
              <Meta data={meta}/>
              <p>{data.content}</p>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}