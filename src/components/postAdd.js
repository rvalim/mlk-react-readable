import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup, Form, Container, Row, Col } from 'react-bootstrap'
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

        this.props.history.goBack()
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { categories } = this.props
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <Row>
                                <Col>
                                    <Form.Control
                                        required
                                        name="title"
                                        placeholder='Title for the new Post'
                                        value={this.state.title}
                                        onChange={this.handleChange.bind(this)} />

                                </Col>
                                <Col>
                                    {this.props.postId ? '' :
                                        <select
                                            name="category"
                                            required
                                            value={this.state.category}
                                            onChange={this.handleChange.bind(this)}>
                                            <option value="">Choose one</option>
                                            {categories.map(p =>
                                                <option key={p.path} value={p.path}>
                                                    {p.name}
                                                </option>
                                            )}
                                        </select>}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Control
                                        name="body"
                                        as="textarea"
                                        rows="5"
                                        required
                                        placeholder='Write your post here'
                                        value={this.state.body}
                                        onChange={this.handleChange.bind(this)} /></Col>
                            </Row>
                            <Row>
                                <Col><ButtonGroup>
                                    <Button type="Submit" variant="outline-success">Save</Button>
                                    <Button onClick={() => this.handleReset()} variant="outline-danger">Cancel</Button>
                                </ButtonGroup></Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
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