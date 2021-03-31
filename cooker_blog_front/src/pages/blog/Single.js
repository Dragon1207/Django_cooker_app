import React, {useEffect, useState} from 'react';
import SingleBlog from '../../components/Blog/Single';
import BlogSidebar from '../../layout/BlogSidebar';
import axiosInstance from '../../axios.js';
import { Container, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import { Link } from "react-router-dom";

const SingleBlogPage = (props) => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get('blog/posts/'+id)
    .then(res => {
      setData(res.data)
    })
  },[])
  
  return (
    <>
      <BlogSidebar>
        {
          Boolean(data) ? 
          <SingleBlog data={data} />
          : 
          <Container maxWidth="lg">
            <Paper>
              <Typography> Aucune recette à cette adresse.<br/> Revenir à la <Link to={'/posts'}>liste</Link> ? </Typography>
            </Paper>
          </Container>
        }
      </BlogSidebar>
    </>
  );
};

export default SingleBlogPage;
