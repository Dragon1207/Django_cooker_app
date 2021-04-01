import React, {useEffect, useState} from 'react';
import BlogList from '../../components/Blog/List';
import BlogSidebar from '../../layout/BlogSidebar';
import axiosInstance from '../../axios.js';
import { Container, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router';



const SearchListPage = (props) => {
  const { search } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('blog/search/?search='+search)
    .then(res => {
      setData(res.data?.filter(post => (post.status === "published")))
    })
  },[])

  return (
    <>
      <BlogSidebar>
        {console.log(search)}
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

export default SearchListPage;
