import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { savePost } from '../actions/posts'

class postAdd extends Component {
    constructor(props) {
        super(props)
        const { post } = props

        this.state = {
            title: post ? post.title : '',
            body: post ? post.body : '',
            category: post ? post.category : ''
        }
    }

    handleReset() {
        const { postId, history } = this.props

        if (postId)
            history.goBack()
        else
            this.setState({
                title: '',
                body: '',
                category: ''
            })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { title, body, category } = this.state
        const { dispatch, authedUser, postId } = this.props

        dispatch(savePost(postId, title, body, authedUser, category))

        this.props.history.push('/')
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { categories } = this.props
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>

                    <h3>Add new Post</h3>

                    <select
                        name="category"
                        required
                        value={this.state.category}
                        onChange={this.handleChange.bind(this)}>
                        <option>Choose one</option>
                        {categories.map(p =>
                            <option key={p.path} value={p.path}>
                                {p.name}
                            </option>
                        )}
                    </select>

                    <input
                        name="title"
                        type='text'
                        placeholder='Title for the new Post'
                        required
                        value={this.state.title}
                        onChange={this.handleChange.bind(this)} />

                    <textarea
                        name="body"
                        rows="5"
                        placeholder='Body for the new Post'
                        required
                        value={this.state.body}
                        onChange={this.handleChange.bind(this)} />

                    <Button variant="primary" type="Submit">Save</Button>
                    <Button variant="danger" onClick={() => this.handleReset()}>Cancel</Button>
                </form>
            </div>
        )

    }
}

function mapStateToProps({ posts, categories, authedUser }, props) {
    const { postId } = props.match.params
    return {
        categories,
        authedUser,
        postId,
        post: posts[postId]
    }
}

export default connect(mapStateToProps)(postAdd)