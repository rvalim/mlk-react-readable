import React from 'react'
import { connect } from 'react-redux'

const PostList = ({ posts, category }) => {
    const formatPost = (post) => {
        if (category && post.category !== category) return 
        
        return <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.author}</p>
            <p>{post.commentCount}</p>
            <p>{post.voteScore}</p>
            <div>
                <a href=''>Up vote</a>
                <a href=''>Down vote</a>
            </div>
            <div>
                <a href=''>Edit</a>
                <a href=''>Delete</a>
            </div>
            <div>
                <a href=''>Detail</a>
            </div>


        </div>
    }

    return <div>{Object.keys(posts).map(p => formatPost(posts[p]))}</div>
}

function mapStateToProps({ posts }, props) {
    const { category } = props.match.params
    return { 
        posts,
        category
     }
}

export default connect(mapStateToProps)(PostList)