import React, { Component } from '../../node_modules/react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, Form, Card } from 'react-bootstrap'
import { updatePost } from '../actions/posts'
import {toDateTime} from '../utils/helper'
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
        const { postId, editMode, comment } = this.props
        this.setState({
            editMode: (postId && editMode) || false,
            body: (comment && comment.body) || ''
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCallback(obj) {
        const { callback, dispatch } = this.props

        dispatch(updatePost(obj.parentId))

        if (callback) callback(obj)
    }

    renderView() {
        const { comment } = this.props

        return <div>
            <p>{comment.body}</p>
            <footer className="blockquote-footer">
                Writen by: {comment.author} at {toDateTime(comment.timestamp)} | Score: {comment.voteScore}
            </footer>
            <ButtonGroup >
                <Button 
                variant="outline-primary"
                className="btn-sm"
                onClick={() => this.handleVote('upVote')} >Up vote</Button>
                <Button 
                variant="outline-primary"
                className="btn-sm"
                onClick={() => this.handleVote('downVote')} >Down vote</Button>
                <Button 
                variant="outline-primary"
                className="btn-sm"
                onClick={() => this.handleEdit(true)} >Edit</Button>
                <Button 
                variant="outline-danger"
                className="btn-sm"
                onClick={() => this.handleDelete()} >Delete</Button>
            </ButtonGroup>
        </div>
    }

    renderEdit() {
        return <Form onSubmit={this.handleSave.bind(this)}>
            <Form.Group>
                <Form.Label>New comment</Form.Label>
                <Form.Control
                    name="body"
                    as="textarea"
                    rows="5"
                    required
                    placeholder='Body for the new Post'
                    value={this.state.body}
                    onChange={this.handleChange.bind(this)} />
            </Form.Group>
            <ButtonGroup>
                <Button 
                    type="submit" 
                    variant="outline-success">Save</Button>
                <Button 
                    variant="outline-danger"
                    onClick={() => this.handleReset()} >Cancel</Button>
            </ButtonGroup>
        </Form>
    }

    render() {
        const { editMode } = this.state

        return (
            <Card >
                <Card.Body>
                    {editMode ?
                        this.renderEdit() :
                        this.renderView()}
                </Card.Body>
            </Card >
        )
    }
}

function mapStateToProps({ authedUser }, props) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(CommentList)