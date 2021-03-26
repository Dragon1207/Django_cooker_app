import React, {useEffect, useState} from 'react';
import BlogList from '../../components/Blog/List';
import BlogSidebar from '../../layout/BlogSidebar';
import axiosInstance from '../../axios.js';



const BlogListPage = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axiosInstance.get('blog/posts')
    .then(res => {
      console.log(res);
      setdata(res.data)
      console.log(data);
    })
  }, [])
  
  

  /*const data={
    posts: [
      {
        ingredient: [
          {id:1,name:'name1'},
          {id:1,name:'name1'},
          {id:1,name:'name1'},
          {id:1,name:'name1'}
        ],
        status:'date',
        published:'date',
        author:'auteur',
        title: 'title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ante felis, sed efficitur dui sagittis sed. Aliquam euismod ipsum eu vehicula scelerisque. Aliquam eget pharetra urna. Nam sem elit, vulputate at eleifend quis, imperdiet id odio. Sed id viverra orci. Nullam venenatis pulvinar eros, et faucibus massa finibus at. Pellentesque vehicula mauris nec turpis ultricies interdum. Nulla porttitor auctor vulputate',
        link: 'link'
      },{
        ingredient: [
          {id:1,name:'name1'},
          {id:1,name:'name1'},
          {id:1,name:'name1'},
          {id:1,name:'name1'}
        ],
        status:'date',
        published:'date',
        author:'auteur',
        title: 'title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ante felis, sed efficitur dui sagittis sed. Aliquam euismod ipsum eu vehicula scelerisque. Aliquam eget pharetra urna. Nam sem elit, vulputate at eleifend quis, imperdiet id odio. Sed id viverra orci. Nullam venenatis pulvinar eros, et faucibus massa finibus at. Pellentesque vehicula mauris nec turpis ultricies interdum. Nulla porttitor auctor vulputate',
        link: 'link'
      },{
        ingredient: [
          {id:1,name:'name1'},
          {id:1,name:'name1'},
          {id:1,name:'name1'},
          {id:1,name:'name1'}
        ],
        status:'date',
        published:'date',
        author:'auteur',
        title: 'title',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ante felis, sed efficitur dui sagittis sed. Aliquam euismod ipsum eu vehicula scelerisque. Aliquam eget pharetra urna. Nam sem elit, vulputate at eleifend quis, imperdiet id odio. Sed id viverra orci. Nullam venenatis pulvinar eros, et faucibus massa finibus at. Pellentesque vehicula mauris nec turpis ultricies interdum. Nulla porttitor auctor vulputate',
        link: 'link'
      }
    ]
  }*/
  //const { data, error, isLoading } = useQuery('posts');
  //console.log(useQuery('posts'));

  return (
    <>
      <BlogSidebar>
        <BlogList data={data?.posts} />
      </BlogSidebar>
    </>
  );
};

export default BlogListPage;
