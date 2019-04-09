import { getInitialData } from '../utils/api'
import { setCategories } from './categories'
import { setPosts } from './posts'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories, posts }) => {
        dispatch(setCategories(categories))
        dispatch(setPosts(posts))
      })
  }
}
