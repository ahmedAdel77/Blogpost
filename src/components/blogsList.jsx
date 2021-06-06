import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Spinner, Button } from 'react-bootstrap';

import BlogItem from './blogItem';

export default function BlogsList(props) {
  //   const [blogs, setBlogs] = useState([]);
  //   const [dataFetched, setDataFetched] = useState(false);
  //   const [isFetching, setIsFetching] = useState(false);

  //   useEffect(() => {
  //     if (!dataFetched) {
  //       setIsFetching(true);

  //       console.log('isFetching', isFetching);
  //       console.log('dataFetched', dataFetched);

  //       setTimeout(() => {
  //         setBlogs(props.initialState);
  //       }, 1000);

  //       setDataFetched(true);
  //       setIsFetching(false);

  //       console.log('isFetching', isFetching);
  //       console.log('dataFetched', dataFetched);
  //     } else {
  //       return;
  //     }
  //   }, [props.initialState]);

  return (
    <>
      {!props.blogs.length ? (
        <>
          <h2 className="mb-4">Sorry, there're no blogs to show.</h2>
          <h5 className="">Start adding a new one: </h5>
          <Button type="button" as={Link} variant="primary" to={`/blog/add`}>
            Add Blog
          </Button>
        </>
      ) : (
        <>
          <h2 className="mb-4">Featured Blogs</h2>
          {props.blogs.map((blog) => (
            <BlogItem
              key={blog.id}
              id={blog.id}
              title={blog.title}
              author={blog.author}
              body={blog.body}
            />
          ))}
        </>
      )}
    </>
  );
}
