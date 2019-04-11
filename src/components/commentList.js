import React, { Component } from '../../node_modules/react'
import { connect } from 'react-redux'
import { getCommentsByPost } from '../utils/api'
import Comment from './comment'

class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = { comments: [] }
    }

    componentDidMount() {
        const { postId } = this.props

        getCommentsByPost(postId)
            .then((res) => {
                this.setState({ comments: res })
            })
    }

    load(comment) {
        const { id } = comment

        this.setState(prevState => ({
            comments: [comment, ...prevState.comments.filter(p => p.id !== id)]
        }));
    }

    render() {
        const { postId } = this.props
        return (
            <div>
                <Comment postId={postId} editMode={true} callback={this.load.bind(this)} />
                <div>
                    {this.state.comments
                        .filter(c => c.deleted === false)
                        .map(p => <Comment key={p.id} comment={p} callback={this.load.bind(this)} />)}
                </div>
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