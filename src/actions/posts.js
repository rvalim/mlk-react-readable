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

function _delPost(id) {
    return {
        type: POST_DEL,
        id,
    }
}

export function setPosts(posts) {
    return {
        type: POST_SET,
        posts,
    }
}

export function delPost(id) {
    return (dispatch) => {
        return api.deletePost(id)
            .then(() => dispatch(_delPost(id)))
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
