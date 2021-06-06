import React from 'react';

import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

export default function BlogItem(props) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          By: {props.author}
        </Card.Subtitle>
        <Card.Text>{props.body}</Card.Text>

        <Card.Link as={Link} to={`/blog/${props.title}-${props.id}`}>
          Read post and view comments
        </Card.Link>
      </Card.Body>
    </Card>
  );
}
