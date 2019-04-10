import * as api from '../utils/api'

export const COMMENT_UPT_COUNT = 'COMMENT_UPT_COUNT'
export const COMMENT_VOTE = 'COMMENT_VOTE'
export const COMMENT_SAVE = 'COMMENT_SAVE'

function _save(postId, body) {
    return {
        type: COMMENT_SAVE,
        postId,
        body,
    }
}

function _vote(postId, vote) {
    return {
        type: COMMENT_VOTE,
        postId,
        vote,
    }
}

function _updateCount(postId, num) {
    return {
        type: COMMENT_UPT_COUNT,
        postId,
        num
    }
}

export function saveComment(postId, body, commentId = null) {
    return (dispatch) => {
        return api.saveComment(postId, commentId, body)
            .then(res => dispatch(_save(postId, body)))
    }
}

export function voteComment(commentId, option) {
    return (dispatch) => {
        return api.voteComment(commentId, option)
            .then(post => dispatch(_vote(commentId, option === 'upVote' ? +1 : -1)))
    }
}

export function delComment(comment) {
    return (dispatch) => {
        return api.deleteComment(comment.id)
            .then(res => {
                if (res.status === 200)
                    dispatch(_updateCount(comment.parentId, -1))
            })
    }
}