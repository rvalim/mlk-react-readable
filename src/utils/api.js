import apiUrl from '../config'

export function getInitialData() {
    return Promise.all(
      [getCategories()]
    ).then(
      ([categories]) => {
        return {
          categories,
        }
      }
    )
  }

export async function getCategories() {
  try {
    const res = await fetch(`${apiUrl}/categories`, getAuthed())
    const obj = await res.json()
    return obj.categories
  } catch (error) {
    console.log(error)
    throw error
  }
}

function getAuthed(){
  return { headers: { 'Authorization': 'mlk-app' }}
}