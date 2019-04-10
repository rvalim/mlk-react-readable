import {
    POST_SET,
    POST_SAVE,
    POST_DEL,
    POST_VOTE
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
        case POST_DEL:
            const posts0 = state
            delete posts0[action.id]

            return {
                ...posts0
            }
        case POST_VOTE:
            const { postId, vote } = action

            return {
                ...state,
                [postId]: {
                    ...state[postId],
                    voteScore: state[postId].voteScore + vote
                }
            }
        default:
            return state
    }
}