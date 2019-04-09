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

export async function savePost(postId, title, body, author, category) {
  const key = postId ? postId : generateUID()
  const post = {
    id: key,
    ..._formatPost(title, body, author, category)
  }

  if (postId) {
    console.log({ title, body })
    await _put(`posts/${postId}`, { title, body })
  }
  else {
    await _post('posts', post)
  }

  return post
}

export async function deletePost(key) {
  return _delete(`posts/${key}`)
}

async function getCategories() {
  const obj = await _get('categories')
  return obj.categories
}

async function getPosts() {
  const obj = await _get('posts')
  return obj
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

async function _delete(url, value) {
  const req = await _request(
    url,
    '',
    "DELETE")

  return req
}

async function _put(url, value) {
  const req = await _request(
    url,
    JSON.stringify(value),
    "PUT",
    { 'Content-Type': 'application/json' })

  return req
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
    .then(_handleErrors)
}

function _handleErrors(response) {
  if (!response.ok) {
    console.log(response)
    //throw Error(response.statusText);
  }
  return response;
}

function _getAuthed() {
  return { 'Authorization': 'mlk-app' }
}