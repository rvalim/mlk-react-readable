import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'

const MyNav = ({ categories }) => {
  const formatCategory = (category) => {
    return (
      <Nav.Item key={category.path}>
        <NavLink to={`/${category.path}`}>{category.name}</NavLink>
      </Nav.Item>
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">MLK Readable</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item to='/'>
            <NavLink to='/'>Home</NavLink>
          </Nav.Item>
          <Nav.Item >
            <NavLink to='/add'>New Post</NavLink>
          </Nav.Item>
          <NavDropdown title="Categories" id="collasible-nav-dropdown">
            {categories.map(p => formatCategory(p))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(MyNav)