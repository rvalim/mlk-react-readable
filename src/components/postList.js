import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostControls from './postControls'

class PostList extends Component { // = ({ posts, category }) => {
    constructor(props) {
        super(props)
        this.state = {
            orderBy: null
        }
    }

    formatPost(post) {
        const { category } = this.props
        if (category && post.category !== category) return

        return <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.author}</p>
            <p>{post.commentCount}</p>
            <p>{post.voteScore}</p>
            <PostControls id={post.id}/>
        </div>
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { posts } = this.props
        return (<div>
            <div>
                <p>Order by:</p>
                <select name="orderBy" onChange={this.handleChange.bind(this)}>
                    {this.props.sortOptions.map((option, index) =>
                        <option key={index} value={index}>
                            {option.name}
                        </option>
                    )}
                </select>
            </div>
            {Object.keys(posts).map(p => this.formatPost(posts[p]))}
        </div>)
    }

}

function mapStateToProps({ posts }, props) {
    const { category } = props.match.params
    const addSortOption = (value, name) => { return { value, name } }

    return {
        posts,
        category,
        sortOptions: [
            addSortOption(null, 'Default'),
            addSortOption('timestamp', 'by date'),
            addSortOption('voteScore', 'by vote')
        ]
    }
}

export default connect(mapStateToProps)(PostList)