import React, {useEffect, useState} from 'react';
import BlogList from '../../components/Blog/List';
import BlogSidebar from '../../layout/BlogSidebar';
import axiosInstance from '../../axios.js';
import { Container, Paper, Typography } from '@material-ui/core';



const BlogListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('blog/posts')
    .then(res => {
      setData(res.data?.filter(post => (post.status === "published")))
    })
  },[])

  return (
    <>
      <BlogSidebar>
        {
          Boolean(data) ? 
          <BlogList data={data} />
          : 
          <Container maxWidth="lg">
            <Paper>
              <Typography> Pas de recettes pour le moment.<br/> Revenez plus tard :) </Typography>
            </Paper>
          </Container>
        }
      </BlogSidebar>
    </>
  );
};

export default BlogListPage;
