import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Nav = ({ categories }) => {
  const formatCategory = (category) => {
    return <li key={category.name}>
      <NavLink to={`/${category.path}`} exact activeClassName='active'>
        {category.name}
      </NavLink>
    </li>
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Post
          </NavLink>
        </li>
        <li>
          <NavLink to='/' activeClassName='active'>
            All Posts
          </NavLink>
        </li>
        <li>
          Categories
          <ul>
            {categories.map(p => formatCategory(p))}
          </ul>
        </li>
      </ul>
    </nav>
  )
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Nav)