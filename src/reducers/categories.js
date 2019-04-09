import { CATEGORY_SET } from '../actions/categories'

export default function categories(state = {}, action){
    switch (action.type) {
        case CATEGORY_SET:
            return {
                ...action.categories
            }
        default:
            return state
    }
}