import apiUrl from '../config'

export function getInitialData() {
    return Promise.all(
      [getCategories(),
      getPosts()]
    ).then(
      ([categories, posts]) => {
        return {
          categories,
          posts,
        }
      }
    )
  }

async function getCategories() {
  const obj = await get('categories')
  return obj.categories
}

async function getPosts() {
  const obj = await get('posts')
  return obj
}

async function get(url){
  try {
    const req = await fetch(`${apiUrl}/${url}`, getAuthed())
    const res = await req.json()
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
} 

function getAuthed(){
  return { headers: { 'Authorization': 'mlk-app' }}
}