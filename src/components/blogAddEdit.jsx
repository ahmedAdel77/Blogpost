import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { Form, Button, Spinner } from 'react-bootstrap';

export default function BlogAddEdit(props) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(props.blog);
  let inEditMode = props.blog ? true : false;

  useEffect(() => {
    if (inEditMode) {
      setAuthor(props.blog.author);
      setTitle(props.blog.title);
      setBody(props.blog.body);
    }
  }, []);

  const handleInputChange = (event) => {
    event.target.name === 'author'
      ? setAuthor(event.target.value)
      : event.target.name === 'title'
      ? setTitle(event.target.value)
      : setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(author);
    setIsSubmitting(true);
    setTimeout(() => {
      if (inEditMode) {
        //edit
        console.log('edit');
        let newBlog = {
          id: props.blog.id,
          title,
          author: author ? author : 'Anonymous',
          body,
          comments: props.blog.comments,
        };
        props.onBlogEdit(newBlog);
      } else {
        // add
        console.log('add');
        let newBlog = {
          id: uuidv4(),
          title,
          author: author ? author : 'Anonymous',
          body,
        };
        props.onBlogAdd(newBlog);
      }
      setIsSubmitting(false);
      props.history.replace('/');
    }, 1000);
  };

  return (
    <>
      <Button
        type="button"
        as={Link}
        onClick={() => window.history.back()}
        variant="light"
        className="mb-3"
      >
        Back
      </Button>
      <h2>{inEditMode ? 'Edit Blog' : 'Post A New Blog'}</h2>

      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Author Name</Form.Label>
          <Form.Control
            type="Text"
            name="author"
            value={author}
            placeholder="Enter your name (optional)"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Blog Title *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            placeholder=""
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Blog Content *</Form.Label>
          <Form.Control
            as="textarea"
            name="body"
            value={body}
            rows={3}
            onChange={handleInputChange}
          />

          {isSubmitting ? (
            <Spinner
              animation="border"
              role="status"
              className="mt-4"
              style={{
                height: '20px',
                width: '20px',
                margin: 'auto',
                display: 'flex',
                placeContent: 'center',
              }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <div
              className="mt-4"
              style={{ display: 'flex', placeContent: 'center' }}
            >
              <Button
                variant="primary"
                type="submit"
                disabled={!title || !body}
              >
                {inEditMode ? 'Edit' : 'Post'}
              </Button>
            </div>
          )}
        </Form.Group>
      </Form>
    </>
  );
}
