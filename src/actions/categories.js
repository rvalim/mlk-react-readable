import * as api from '../utils/api'

export const CATEGORY_GET = 'CATEGORY_GET'
export const CATEGORY_SET = 'CATEGORY_SET'

function _getCategories(categories) {
    return {
      type: CATEGORY_GET,
      categories,
    }
  }

export function setCategories(categories){
  return {
    type: CATEGORY_SET,
    categories,
  }
}