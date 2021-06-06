import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import BlogItem from './blogItem';

export default function BlogsList(props) {
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
