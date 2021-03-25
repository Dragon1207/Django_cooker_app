import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Container, Paper} from '@material-ui/core';
import Post from './Article';

export default function List(props) {

const { data, error } = props;
  return (
    <>
      <Container maxWidth="lg">
        <Paper>
          {data.map((post, i) => (
            <Post data= {post} key={i}/>
          ))}
        </Paper>
      </Container>
    </>
  );
}
