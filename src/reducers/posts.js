import {
    POST_SET,
    POST_SAVE,
    POST_DEL
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
        // case COMMENT_UPT_COUNT:
        //     const { postId: postId0, num } = action
        //     return {
        //         ...state,
        //         [postId0]: {
        //             ...state[postId0],
        //             commentCount: state[postId0].commentCount + num
        //         }
        //     }
        default:
            return state
    }
}