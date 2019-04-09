import apiUrl from '../config'
import { generateUID } from './helper'

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
  const obj = await _get('categories')
  return obj.categories
}

async function getPosts() {
  const obj = await _get('posts')
  return obj
}

export async function savePost(title, body, author, category) {
  const key = generateUID()
  const post = {
    id: key,
    ..._formatPost(title, body, author, category)
  }

  const obj = await _post('posts', post)

  return post
}

function _formatPost(title, body, author, category) {
  return {
    title,
    body,
    timestamp: Date.now(),
    author,
    category,
    voteScore: 0,
    deleted: false,
    commentCount: 0
  }
}

async function _post(url, value) {
  const req = await _request(
    url,
    JSON.stringify(value),
    "POST",
    { 'Content-Type': 'application/json' })

  return req
}

async function _get(url) {
  const req = await _request(url)
  const res = await req.json()
  return res
}

async function _request(url, content = '', method = "GET", header = {}) {
  try {
    return fetch(
      `${apiUrl}/${url}`,
      {
        method,
        headers: {
          ..._getAuthed(),
          ...header
        },
        ...(content ? { body: content } : {})
      })
  } catch (error) {
    console.log(error)
    throw error
  }
}

function _getAuthed() {
  return { 'Authorization': 'mlk-app' }
}