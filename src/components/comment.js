import React, { Component } from '../../node_modules/react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
// import {saveComment, voteComment, delComment} from '../actions/comments'
import * as api from '../utils/api'

class CommentList extends Component {
    constructor(props) {
        super(props)
        const { editMode, comment } = props
        this.state = {
            editMode,
            body: (comment && comment.body) || ''
        }
    }

    handleEdit(value) {
        this.setState({ editMode: value })
    }

    handleDelete() {
        const { comment } = this.props

        api.deleteComment(comment.id)
            .then((res) => this.handleCallback(res))
    }

    handleVote(value) {
        const { comment } = this.props

        api.voteComment(comment.id, value)
            .then(res => this.handleCallback(res))
    }

    handleSave(e) {
        e.preventDefault()
        const { body } = this.state
        const { postId, comment } = this.props
        const commentId = comment ? comment.id : null

        api.saveComment(postId, commentId, body)
            .then((res) => {
                this.handleCallback(res)
                this.handleReset()
            })
    }

    handleReset() {
        const {postId, editMode, comment} = this.props
        this.setState({ 
            editMode: (postId && editMode) || false,
            body: (comment && comment.body) || ''
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCallback(obj) {
        const { callback } = this.props
        if (callback) callback(obj)
    }

    renderView() {
        const { comment } = this.props

        return <div key={comment.id}>
            <h4>{comment.body}</h4>
            <div>
                <p>Writen by: {comment.author}</p>
                <p>Publicated at: {comment.timestamp}</p>
                <p>Score: {comment.voteScore}</p>
            </div>
        </div>
    }

    renderEdit() {
        return <div>
            <form onSubmit={this.handleSave.bind(this)}>

                <h3>Add new Comment</h3>

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
    }

    render() {
        const { editMode } = this.state

        return (
            <div>
                {editMode ?
                    this.renderEdit() :
                    <div>
                        {this.renderView()}
                        <div >
                            <Button onClick={() => this.handleVote('upVote')}>Up vote</Button>
                            <Button onClick={() => this.handleVote('downVote')}>Down vote</Button>
                            <Button onClick={() => this.handleEdit(true)}>Edit</Button>
                            <Button onClick={() => this.handleDelete()}>Delete</Button>
                        </div>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({ authedUser }, props) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(CommentList)