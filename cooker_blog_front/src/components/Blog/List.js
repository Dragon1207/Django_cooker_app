import React from 'react';
import { Container} from '@material-ui/core';
import Post from './Article';

export default function List(props) {
  const { data, error } = props;
  return (
    <>
      <Container maxWidth="md">
        {data.posts.map((post, i) => (
          <Post data= {post} key={i}/>
        ))}
      </Container>
    </>
  );
}
