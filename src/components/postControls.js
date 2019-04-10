import React from 'react'
import { connect } from 'react-redux'
import { delPost, votePost } from '../actions/posts'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const postControls = ({ post, dispatch }) => {
    const handleDelete = () => {
        dispatch(delPost(post.id))
    }

    const handleVote = (value) => {
        dispatch(votePost(post.id, value))
    }

    return (
        <div>
            <Button onClick={() => handleVote('upVote')}>Up vote</Button>
            <Button onClick={() => handleVote('downVote')}>Down vote</Button>
            <Button>
                <NavLink
                    to={`/${post.category}/${post.id}`}
                    activeClassName='active'>
                    Detail
                </NavLink>
            </Button>
            <Button>
                <NavLink
                    to={`/Edit/${post.id}`}
                    activeClassName='active'>
                    Edit
                </NavLink>
            </Button>
            <Button onClick={() => handleDelete()}>Delete</Button>
        </div>
    )
}

function mapStateToProps({ posts }, props) {
    const { id } = props

    return {
        post: posts[id],
    }
}

export default connect(mapStateToProps)(postControls)
