import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Container, Grid } from '@material-ui/core';
import axiosInstance from '../axios.js';

export default function BlogSidebar(props) {
  const {
    children, 
  } = props;

	const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get('blog/posts')
    .then(res => {
      setData(res.data.filter(post => (post.status === "published")))
    })
  },[])

  return(
    <>
      <Container maxWidth="lg" style={{marginTop:'5%'}}>
			<Grid container spacing={2}>
          <Grid xs={12} sm={8} md={8} lg={8} item>
						{children}
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}  container>
            <Grid item xs container zeroMinWidth direction="column" spacing={2}>
              <h4>Récentes publications</h4>
              <div>
                {data?.map((post, i) => (
                  <div key={i}>
                    <Link to={'/post/'+ post.id}><h6>{post.title}</h6></Link>
                    <p>{(new Date(post.published)).toLocaleDateString()}</p>
                  </div>
                ))}															
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}