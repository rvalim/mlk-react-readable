import React from 'react'
import {connect} from 'react-redux'
import CommentList from './commentList'

const postDetail = ({post}) => {
    return (
    <div>
        <h2>{post.title}</h2>
        <div>
            <p>Writen by: {post.author}{post.id}</p>
            <p>Publicated at: {post.timestamp}</p>
            <p>Category: {post.category}</p>
            <p>Score: {post.voteScore}</p>
            <p>Comments: {post.commentCount}</p>
        </div>
        <div>
            {post.body}
        </div>
        <div>
            <h3>Comments</h3>
            <div>
                <CommentList postId={post.id} />
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