import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Container, Spinner } from 'react-bootstrap';

import Navbar from './components/navbar';
import BlogsList from './components/blogsList';
import BlogAddEdit from './components/blogAddEdit';
import BlogView from './components/blogView';

function App() {
  let initialState = [
    {
      id: '7f9b5ae8-d9ca-4384-91ac-62b7152a4f88',
      title: 'First Blog Title',
      author: 'Ahmed Adel',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid maiores necessitatibus pariatur fugiat doloribus blanditiis explicabo quas quo! Eos ad, accusantium labore eaque doloribus nulla expedita asperiores tempora aliquam quibusdam?',
      comments: [
        {
          id: 'f6e3273b-9092-46a3-8025-a2218eb998cc',
          author: 'Max',
          body: 'I like this post a lot.',
        },
        {
          id: 'fb2c816b-105b-44fa-bbc7-d2270393e8ad',
          author: 'Harry',
          body: 'Thank you.',
        },
      ],
    },
    {
      id: '166e03e1-749f-4f68-87e8-fc8980775613',
      title: 'Second Blog Title',
      author: 'Adel Ahmed',
      body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid maiores necessitatibus pariatur fugiat doloribus blanditiis explicabo quas quo! Eos ad, accusantium labore eaque doloribus nulla expedita asperiores tempora aliquam quibusdam?',
      comments: [
        {
          id: '1dfaaaf3-34f2-492a-806e-f98fa97739d7',
          author: 'John',
          body: 'I like this post a lot.',
        },
      ],
    },
  ];

  const [blogs, setBlogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      setIsFetching(true);

      console.log('isFetching', isFetching);
      console.log('dataFetched', dataFetched);

      setTimeout(() => {
        setBlogs(initialState);
        setDataFetched(true);
        setIsFetching(false);
      }, 1000);

      console.log('isFetching', isFetching);
      console.log('dataFetched', dataFetched);
    } else {
      return;
    }
  }, []);

  const handleAddBlog = (blog) => {
    setBlogs([blog, ...blogs]);
  };

  const handleEditBlog = (editedBlog) => {
    let data = [...blogs];
    data[data.findIndex((blog) => blog.id === editedBlog.id)] = editedBlog;

    setBlogs(data);
  };

  const handleDeleteBlog = (id) => {
    let data = [...blogs];

    data = data.filter((blog) => blog.id !== id);
    // data.splice(
    //   data.findIndex((blog) => blog.id === id),
    //   1
    // );

    setBlogs(data);
  };

  const handleAddComment = (blogId, comment) => {
    let data = [...blogs];
    data[data.findIndex((blog) => blog.id === blogId)].comments.unshift(
      comment
    );

    setBlogs(data);
  };

  const handleEditComment = (blogId, editedComment) => {
    let data = [...blogs];

    let blogIndex = data.findIndex((blog) => blog.id === blogId);
    let blogToEditComment = data[blogIndex];
    data.splice(blogIndex, 1);

    let commentIndex = blogToEditComment.comments.findIndex(
      (comment) => comment.id === editedComment.id
    );

    blogToEditComment.comments[commentIndex] = editedComment;

    data.splice(blogIndex, 0, blogToEditComment);

    setBlogs(data);
  };

  const handleDeleteComment = (blogId, commentId) => {
    let data = [...blogs];

    let blogIndex = data.findIndex((blog) => blog.id === blogId);
    let blogToDeleteComment = data[blogIndex];
    data.splice(blogIndex, 1);

    blogToDeleteComment.comments = blogToDeleteComment.comments.filter(
      (comment) => comment.id !== commentId
    );

    data.splice(blogIndex, 0, blogToDeleteComment);

    setBlogs(data);
  };

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <Container>
          {isFetching ? (
            <Spinner
              animation="border"
              role="status"
              style={{
                margin: 'auto',
                display: 'flex',
                placeContent: 'center',
              }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <Switch>
              <Route
                path="/blog/:id/edit"
                render={(props) => (
                  <BlogAddEdit
                    {...props}
                    blog={blogs.find(
                      (blog) => blog.id === props.match.params.id
                    )}
                    onBlogEdit={handleEditBlog}
                  />
                )}
              ></Route>
              <Route
                path="/blog/add"
                render={(props) => (
                  <BlogAddEdit {...props} onBlogAdd={handleAddBlog} />
                )}
              ></Route>
              <Route
                path="/blog/:id"
                render={(props) => (
                  <BlogView
                    {...props}
                    blog={blogs.find((blog) => {
                      let id = props.match.params.id.split('-');
                      id.shift(0);
                      id = id.join('-');

                      if (blog.id === id) {
                        return true;
                      } else {
                        return false;
                      }
                    })}
                    onBlogDelete={handleDeleteBlog}
                    onCommentAdd={handleAddComment}
                    onCommentEdit={handleEditComment}
                    onCommentDelete={handleDeleteComment}
                  />
                )}
              ></Route>
              <Route path="/">
                <BlogsList blogs={blogs} />
              </Route>
            </Switch>
          )}
        </Container>
      </Router>
    </>
  );
}

export default App;
