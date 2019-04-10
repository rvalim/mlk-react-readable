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
    await _put(`posts/${postId}`, { title, body })
  }
  else {
    await _post('posts', post)
  }

  return post
}

export async function deletePost(postId) {
  return _delete(`posts/${postId}`)
}

export async function votePost(postId, vote){
  await _post(`posts/${postId}`, { option: vote })
}

export async function getCommentsByPost(postId){
  console.log(`posts/${postId}/comments`)
  const obj = await _get(`posts/${postId}/comments`)
  return obj
}

export async function saveComment(postId, commentId, body) {
  const key = commentId ? commentId : generateUID()
  const obj = {
    id: key,
    ..._formatComment(postId, body)
  }

  if (commentId) {
    await _put(`comments/${commentId}`, obj)
  }
  else {
    await _post('comments', obj)
  }

  return obj
}

export async function deleteComment(commentId){
  return _delete(`comments/${commentId}`)
}

export async function voteComment(commentId, vote){
  await _post(`comments/${commentId}`, { option: vote })
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

function _formatComment(postId, body, author) {
  return {
    parentId: postId,
    timestamp: Date.now(),
    body,
    author,
    voteScore: 0,
    deleted: false,
    parentDeleted: false
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