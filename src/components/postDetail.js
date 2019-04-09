import React from 'react'
import {connect} from 'react-redux'

const postDetail = ({post}) => {
    return (
    <div>
        <h2>{post.title}</h2>
        <div>
            <p>Writen by: {post.author}</p>
            <p>Publicated at: {post.timestamp}</p>
            <p>Category: {post.category}</p>
            <p>Score: {post.voteScore}</p>
        </div>
        <div>
            {post.body}
        </div>
        <div>
            <h3>Comments</h3>
            <div>
                Need to by done
            </div>
        </div>
    </div>
    )
}

function mapStateToProps({posts}, props) {
    const {postId} = props.match.params
    return {
        post: posts[postId] || {}
    }
}

export default connect(mapStateToProps)(postDetail)