import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Container, Row, Col, Jumbotron, ButtonGroup, Button } from 'react-bootstrap'
import PostControls from './postControls'
import { toDateTime } from '../utils/helper'

class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortBy: null,
            posts: []
        }
    }

    formatPost(post) {
        const { category } = this.props
        if (category && post.category !== category) return

        return <Card key={post.id} className="text-center">
            <Card.Header>{post.title} - {post.category}</Card.Header>
            <Card.Body>
                <footer className="blockquote-footer">
                    Writen by: {post.author} at {toDateTime(post.timestamp)}
                    Score: {post.voteScore} | Comments: {post.commentCount}
                </footer>
                <PostControls id={post.id} />
            </Card.Body>
        </Card>
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSort(field) {
        this.setState({sortBy: field})
    }

    sortPosts() {
        const {posts} = this.props 
        const {sortBy} = this.state
        const aux = Object.keys(posts).map(p => posts[p])
        
        if (sortBy)
            aux.sort((a, b) => {
                return a[sortBy] - b[sortBy];
            });
        
        return aux
    }

    render() {
        return (<Container>
            <Row className="justify-content-md-center">
                <Col>
                    <ButtonGroup>
                        {this.props.sortOptions.map((option, index) =>
                            <Button
                                key={index}
                                className="btn-sm"
                                onClick={() => this.handleSort(option.value)}
                                checked>
                                {option.name}
                            </Button>
                        )}
                    </ButtonGroup>
                </Col>
            </Row>
            <Jumbotron>
                {this.sortPosts().map(p => this.formatPost(p))}
            </Jumbotron>

        </Container>)
    }

}

function mapStateToProps({ posts }, props) {
    const { category } = props.match.params
    const addSortOption = (value, name) => { return { value, name } }

    return {
        posts,
        category,
        sortOptions: [
            addSortOption('', 'Default'),
            addSortOption('timestamp', 'by date'),
            addSortOption('voteScore', 'by vote')
        ]
    }
}

export default connect(mapStateToProps)(PostList)