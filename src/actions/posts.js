import * as api from '../utils/api'

export const POST_SET = 'POST_SET'
export const POST_SAVE = 'POST_SAVE'
export const POST_DEL = 'POST_DEL'

function _savePost(post) {
    return {
        type: POST_SAVE,
        post,
    }
}

function _delPost(postId) {
    return {
        type: POST_DEL,
        id: postId,
    }
}

export function updatePost(postId) {
    return (dispatch) => {
        return api.getPost(postId)
            .then(post => dispatch(_savePost(post)))
    }
}

export function setPosts(posts) {
    return {
        type: POST_SET,
        posts,
    }
}

export function delPost(postId) {
    return (dispatch) => {
        return api.deletePost(postId)
            .then(() => dispatch(_delPost(postId)))
    }
}

export function votePost(postId, option) {
    return (dispatch) => {
        return api.votePost(postId, option)
            .then(post => dispatch(_savePost(post)))
    }
}

export function savePost(postId, title, body, author, category) {
    return (dispatch) => {
        return api.savePost(postId, title, body, author, category)
            .then(post => dispatch(_savePost(post)))
    }
}
