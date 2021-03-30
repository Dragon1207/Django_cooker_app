import React, {useEffect, useState} from 'react';
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
      setData(res.data)
    })
  },[])

  return(
    <>
      <Container maxWidth="lg" style={{marginTop:'5%'}}>
			<Grid container spacing={2}>
          <Grid md={8} lg={8} item>
						{children}
          </Grid>
          <Grid item md={4} lg={4} sm container>
            <Grid item xs container zeroMinWidth direction="column" spacing={2}>
							<div className="widget-wrap">
								<div className="single-sidebar-widget popular-post-widget">
									<h4 className="popular-title">Récentes publications</h4>
									<div className="popular-post-list">
										{data?.map((post, i) => (
											<div key={i} className="single-post-list d-flex flex-row align-items-center">
												<div className="details">
													<a href="blog-single.html"><h6>{post.title}</h6></a>
													<p>{(new Date(post.published)).toLocaleDateString()}</p>
												</div>
											</div>
										))}
																									
									</div>
								</div>
							</div>

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}