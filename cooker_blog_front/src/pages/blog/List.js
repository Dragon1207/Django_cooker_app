import React from 'react';
import BlogList from '../../components/Blog/List';
import BlogSidebar from '../../layout/BlogSidebar';
//import { useQuery } from 'jsonapi-react';

const BlogListPage = () => {
  const data={
    posts: [
      {
        meta: {
          cate:'categorie',
          date:'date',
          author:'auteur'
        },
        title: 'title',
        img: 'img',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ante felis, sed efficitur dui sagittis sed. Aliquam euismod ipsum eu vehicula scelerisque. Aliquam eget pharetra urna. Nam sem elit, vulputate at eleifend quis, imperdiet id odio. Sed id viverra orci. Nullam venenatis pulvinar eros, et faucibus massa finibus at. Pellentesque vehicula mauris nec turpis ultricies interdum. Nulla porttitor auctor vulputate',
        link: 'link'
      },{
        meta: {
          cate:'categorie',
          date:'date',
          author:'auteur'
        },
        title: 'title',
        img: 'img',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ante felis, sed efficitur dui sagittis sed. Aliquam euismod ipsum eu vehicula scelerisque. Aliquam eget pharetra urna. Nam sem elit, vulputate at eleifend quis, imperdiet id odio. Sed id viverra orci. Nullam venenatis pulvinar eros, et faucibus massa finibus at. Pellentesque vehicula mauris nec turpis ultricies interdum. Nulla porttitor auctor vulputate',
        link: 'link'
      },{
        meta: {
          cate:'categorie',
          date:'date',
          author:'auteur'
        },
        title: 'title',
        img: 'img',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas ante felis, sed efficitur dui sagittis sed. Aliquam euismod ipsum eu vehicula scelerisque. Aliquam eget pharetra urna. Nam sem elit, vulputate at eleifend quis, imperdiet id odio. Sed id viverra orci. Nullam venenatis pulvinar eros, et faucibus massa finibus at. Pellentesque vehicula mauris nec turpis ultricies interdum. Nulla porttitor auctor vulputate',
        link: 'link'
      }
    ]
  }
  //const { data, error, isLoading } = useQuery('posts');
  //console.log(useQuery('posts'));

  return (
    <>
      <BlogSidebar>
        <BlogList data={data} />
      </BlogSidebar>
    </>
  );
};

export default BlogListPage;
