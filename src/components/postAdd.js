import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { savePost } from '../actions/posts'

class postAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: null,
            body: null,
            category: null
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const { title, body, category } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(savePost(title, body, authedUser, category))
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
                    onChange={this.handleChange.bind(this)}>
                        <option value="">Choose one</option>
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
                        onChange={this.handleChange.bind(this)} />

                    <textarea
                        name="body"
                        rows="5"
                        placeholder='Body for the new Post'
                        required
                        onChange={this.handleChange.bind(this)} />

                    <Button variant="primary" type="Submit">Save</Button>
                    <Button variant="danger" type="Reset">Cancel</Button>
                </form>
            </div>
        )

    }
}

function mapStateToProps({ categories, authedUser }) {
    return { categories, authedUser }
}

export default connect(mapStateToProps)(postAdd)