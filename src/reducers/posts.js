import { POST_SET } from '../actions/posts'

export default function posts(state = {}, action) {
    switch (action.type) {
        case POST_SET:
            const posts = action.posts
                .reduce((json, value) => { json[value.id] = value; return json; }, {});
                
            return {
                ...posts
            }
        default:
            return state
    }
}