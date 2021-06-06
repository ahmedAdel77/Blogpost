import React from 'react';

import { Navbar as ReactNavbar, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <ReactNavbar bg="dark mb-5" variant="dark">
      <ReactNavbar.Brand as={Link} to="/">
        Blog Post
      </ReactNavbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
      </Nav>

      <Nav className="">
        <Nav.Link as={Link} to="/blog/add">
          Add Blog
        </Nav.Link>
      </Nav>
    </ReactNavbar>
  );
}
