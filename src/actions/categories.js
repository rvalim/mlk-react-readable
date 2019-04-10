export const CATEGORY_SET = 'CATEGORY_SET'

export function setCategories(categories){
  return {
    type: CATEGORY_SET,
    categories,
  }
}