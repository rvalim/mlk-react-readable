export const POST_SET = 'POST_SET'
export const POST_SAVE = 'POST_SAVE'
export const POST_GET = 'POST_GET'
export const POST_DEL = 'POST_DEL'
export const POST_UPT = 'POST_UPT'
export const POST_GET_ALL = 'POST_GET_ALL'

function _getPost(coment) {
    return {
        type: POST_GET,
        coment,
    }
}

function _getAllPost(coments) {
    return {
        type: POST_GET_ALL,
        coments,
    }
}

function _savePost(Post) {
    return {
        type: POST_SAVE,
        Post,
    }
}

function _delPost(key) {
    return {
        type: POST_DEL,
        key,
    }
}

export function setPosts(posts) {
    return {
        type: POST_SET,
        posts,
    }
}

export function delPost(key) {
    return (dispatch) => {
        // return fetch( get Post(key)
        //     .then(res => {
        //         dispatch(_delPost(res))
        //     })
    }
}

export function savePost(Post) {
    return (dispatch) => {
        // return fetch( get Post(Post)
        //     .then(res => {
        //         dispatch(_savePost(res))
        //     })
    }
}

export function getAllPost(pId) {
    return (dispatch) => {
        // return fetch( get Post(pId)
        //     .then(res => {
        //         dispatch(_getAllPost(res))
        //     })
    }
}

export function getPost(key) {
    return (dispatch) => {
        // return fetch( get Post(key)
        //     .then(res => {
        //         dispatch(_getPost(res))
        //     })
    }
}