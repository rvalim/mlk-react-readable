import React from 'react'
import { connect } from 'react-redux'
import CommentList from './commentList'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'
import { toDateTime } from '../utils/helper'
import PostControls from './postControls';

const postDetail = ({ post }) => {
    return (<Container>
        <Row className="justify-content-md-center">
            <Col>
                <Jumbotron>
                    <h2>{post.title}</h2>
                    <footer className="blockquote-footer">
                        Writen by: {post.author} at {toDateTime(post.timestamp)}
                        Score: {post.voteScore} | Comments: {post.commentCount}
                    </footer>
                    <div>
                        {post.body}
                    </div>
                    <PostControls id={post.id} />
                    <div>
                        <h4>Comments</h4>
                        <div>
                            <CommentList postId={post.id} />
                        </div>
                    </div>
                </Jumbotron>
            </Col>
        </Row>
    </Container>
    )
}

function mapStateToProps({ posts }, props) {
    const { postId } = props.match.params
    return {
        post: posts[postId]
    }
}

export default connect(mapStateToProps)(postDetail)