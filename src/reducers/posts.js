import {
    POST_SET,
    POST_SAVE
} from '../actions/posts'

export default function posts(state = {}, action) {
    switch (action.type) {
        case POST_SET:
            const posts = action.posts
                .reduce((json, value) => { json[value.id] = value; return json; }, {});

            return {
                ...posts
            }
        case POST_SAVE:
            const { post } = action

            return {
                ...state,
                [post.id]: {
                    ...post
                }
            }

        default:
            return state
    }
}