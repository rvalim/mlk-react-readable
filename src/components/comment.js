import React, { Component } from '../../node_modules/react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import {saveComment, voteComment, delComment} from '../actions/comments'


class CommentList extends Component {
    constructor(props) {
        super(props)
        const {editMode, comment} = props
        this.state = { 
            editMode,
            body: (comment && comment.body) || '',
            score: (comment && comment.voteScore) || ''
        }
    }

    handleEdit(value){
        this.setState({editMode:value})
    }

    handleDelete() {
        const {comment} = this.props
        this.props.dispatch(delComment(comment))
        this.handleCallback()
    }

    handleVote(value) {
        const { comment } = this.props
        this.props.dispatch(voteComment(comment.id, value))
        this.setState(prevState => ({ 
            score: (prevState.score + (value === 'upVote'? 1 : -1))
        })) 
    }

    handleSave(e) {
        e.preventDefault()
        const { body } = this.state
        const { postId, dispatch, comment } = this.props
        const commentId = comment? comment.id : null

        dispatch(saveComment(postId, body, commentId))
        this.handleCallback()
    }

    handleReset() {
        const { comment } = this.props
        this.setState({ 
            editMode: false,
            body: (comment && comment.body) || '',
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleCallback(){
        const {callback} = this.props
        if (callback) callback()
    }

    renderView() {
        const { comment } = this.props
        const {score} = this.state
        
        return <div key={comment.id}>
            <h4>{comment.body}</h4>
            <div>
                <p>Writen by: {comment.author}</p>
                <p>Publicated at: {comment.timestamp}</p>
                <p>Score: {score}</p>
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
        const {comment} = this.props
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