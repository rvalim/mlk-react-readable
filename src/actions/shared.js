import { getInitialData } from '../utils/api'
import { setCategories } from './categories'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ categories }) => {
        dispatch(setCategories(categories))
      })
  }
}
