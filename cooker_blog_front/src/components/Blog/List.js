import React, {useEffect, useState} from 'react';
import { Container, Paper} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Post from './Article';


export default function List(props) {

  const { data, error } = props;
  const [items, setItems] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const COUNT =  Math.floor(data.length/10) + (data.length%10===0 ? 0 : 1)
  const [page, setPage] = useState(1);

  console.log(page,data,items);
  function loadPage(page) {
    setIsLoading(true)
    setItems([])
    setTimeout(()=>{
      setItems(data.slice((page-1)*10,page*10))
      setIsLoading(false)
    },1000)
  }

  useEffect(()=>{
    loadPage(page)
  },[])
  
  const handleChange = (event, value) => {
    setPage(value);
    loadPage(page)
  };

  return (
    <>
      <Container maxWidth="lg">
        <Paper>
          {isLoading ? 'Loading...' :
          items?.map((post, i) => (
            <Post data= {post} key={i}/>
          ))}
          
          <Pagination count={COUNT} page={page} onChange={handleChange} />
        </Paper>
      </Container>
    </>
  );
}
