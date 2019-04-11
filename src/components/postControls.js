import React, {Component} from 'react'
import { connect } from 'react-redux'
import { delPost, votePost } from '../actions/posts'
import { NavLink, Redirect } from 'react-router-dom'
import { Button, ButtonGroup } from 'react-bootstrap'

class PostControls extends Component { //} ({ post, dispatch }) => {
    constructor(props){
        super(props)
        this.state = {isDeleted:false}
    }

    handleDelete ()  {
        const {dispatch, post} = this.props
        dispatch(delPost(post.id))
        this.setState({isDeleted:true})
    }

    handleVote (value) {
        const {dispatch, post} = this.props
        dispatch(votePost(post.id, value))
    }

    render(){
        const {isDeleted} = this.state
        const {post} = this.props
        return isDeleted? <Redirect to="/"/>:
        <ButtonGroup>
            <Button
                className="btn-sm"
                variant="outline-primary"
                onClick={() => this.handleVote('upVote')} >Up vote</Button>
            <Button
                className="btn-sm"
                variant="outline-primary"
                onClick={() => this.handleVote('downVote')}>Down vote</Button>
            <Button
                className="btn-sm"
                variant="outline-primary">
                <NavLink
                    to={`/${post.category}/${post.id}`}
                    activeClassName='active'>
                    Detail
                </NavLink>
            </Button>
            <Button
                className="btn-sm"
                variant="outline-primary">
                <NavLink
                    to={`/Edit/${post.id}`}
                    activeClassName='active'>
                    Edit
                </NavLink>
            </Button>
            <Button
                className="btn-sm"
                variant="outline-danger"
                onClick={() => this.handleDelete()}>Delete</Button>
        </ButtonGroup>
    }
}

function mapStateToProps({ posts }, props) {
    const { id } = props

    return {
        post: posts[id],
    }
}

export default connect(mapStateToProps)(PostControls)
