import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Form, Spinner, Button, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function BlogView(props) {
  const [comment, setComment] = useState('');
  const [commentToEdit, setCommentToEdit] = useState('');
  const [author, setAuthor] = useState('');
  const [authorToEdit, setAuthorToEdit] = useState('');
  const [idToEdit, setIdToEdit] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal
  const [deleteBlogShow, setDeleteBlogShow] = useState(false);
  const handleDeleteBlogClose = () => setDeleteBlogShow(false);
  const handleDeleteBlogShow = () => setDeleteBlogShow(true);

  const [editCommentShow, setEditCommentShow] = useState(false);
  const handleEditCommentClose = () => setEditCommentShow(false);
  const handleEditCommentShow = (c) => {
    setIdToEdit(c.id);
    setAuthorToEdit(c.author);
    setCommentToEdit(c.body);
    setEditCommentShow(true);
  };

  const [deleteCommentShow, setDeleteCommentShow] = useState(false);
  const handleDeleteCommentClose = () => setDeleteCommentShow(false);
  const handleDeleteCommentShow = (commentId) => {
    setIdToEdit(commentId);
    setDeleteCommentShow(true);
  };

  const handleInputChange = (event) => {
    event.target.name === 'comment'
      ? setComment(event.target.value)
      : event.target.name === 'author'
      ? setAuthor(event.target.value)
      : event.target.name === 'authorToEdit'
      ? setAuthorToEdit(event.target.value)
      : setCommentToEdit(event.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    let newComment = {
      id: uuidv4(),
      author: author ? author : 'Anonymous',
      body: comment,
    };
    props.onCommentAdd(props.blog.id, newComment);
  };

  const handleBlogDelete = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      props.onBlogDelete(props.blog.id);
      props.history.replace('/');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCommentEdit = (event) => {
    event.preventDefault();
    let editedComment = {
      id: idToEdit,
      author: authorToEdit ? authorToEdit : 'Anonymous',
      body: commentToEdit,
    };
    props.onCommentEdit(props.blog.id, editedComment);
    setEditCommentShow(false);
  };

  const handleCommentDelete = (event) => {
    event.preventDefault();

    props.onCommentDelete(props.blog.id, idToEdit);
    setDeleteCommentShow(false);
  };

  console.log(props);

  return (
    <>
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
          <h2>{props.blog.title}</h2>
          <h6>By: {props.blog.author}</h6>
          <br />
          <p>{props.blog.body}</p>

          <Button
            variant="danger"
            onClick={handleDeleteBlogShow}
            className="float-right ml-1"
          >
            Delete
          </Button>
          {/* Modals */}
          <Modal show={deleteBlogShow} onHide={handleDeleteBlogClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              By confirming, this blog will no longer be in the site.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteBlogClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleBlogDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {/* ----------- */}
          <Modal show={editCommentShow} onHide={handleEditCommentClose}>
            <Modal.Body>
              <Form onSubmit={handleAddComment}>
                <Form.Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Control
                      name="authorToEdit"
                      value={authorToEdit}
                      className="mb-2"
                      id="inlineFormInput"
                      placeholder="Your Name (Optional)"
                      onChange={handleInputChange}
                    />
                  </Col>

                  <Col xs="auto">
                    <Form.Control
                      name="commentToEdit"
                      value={commentToEdit}
                      className="mb-2"
                      id="inlineFormInput"
                      placeholder="Your Comment *"
                      onChange={handleInputChange}
                    />
                  </Col>
                </Form.Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditCommentClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCommentEdit}
                disabled={!commentToEdit}
              >
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
          {/* ------------- */}
          <Modal show={deleteCommentShow} onHide={handleDeleteCommentClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              By confirming, this comment will no longer be on this blog.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteCommentClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleCommentDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <Button
            type="button"
            as={Link}
            variant="success"
            to={`/blog/${props.blog.id}/edit`}
            className="float-right"
          >
            Edit
          </Button>

          <br />
          <h6>Comments ({props.blog.comments?.length || 0})</h6>
          <hr />

          <Form onSubmit={handleAddComment}>
            <Form.Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  name="author"
                  value={author}
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Your Name (Optional)"
                  onChange={handleInputChange}
                />
              </Col>

              <Col xs="auto">
                <Form.Control
                  name="comment"
                  value={comment}
                  className="mb-2"
                  id="inlineFormInput"
                  placeholder="Your Comment *"
                  onChange={handleInputChange}
                />
              </Col>

              <Col xs="auto">
                <Button
                  className="mb-2"
                  disabled={!comment}
                  onClick={handleAddComment}
                >
                  Add Comment
                </Button>
              </Col>
            </Form.Row>
          </Form>

          <div className="mt-3">
            {props.blog.comments?.map((comment) => (
              <div key={comment.id}>
                <strong>{comment.author} </strong>
                <p>{comment.body}</p>

                <div style={{ margin: '-20px 0 0 -10px' }}>
                  <Button
                    variant="link"
                    onClick={() => handleEditCommentShow(comment)}

                    //   className="float-right"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteCommentShow(comment.id)}
                    variant="link"
                    // className="float-right"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
