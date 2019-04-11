import apiUrl from '../config'
import { generateUID } from './helper'

export function getInitialData() {
  return Promise.all(
    [_getCategories(),
    _getPosts()]
  ).then(
    ([categories, posts]) => {
      return {
        categories,
        posts,
      }
    }
  )
}

export function getCommentsByPost(postId) {
  return _get(`posts/${postId}/comments`)
}

export function getPost(postId)
{
  return _get(`posts/${postId}`)
}

export function saveComment(postId, commentId, body) {
  const key = commentId ? commentId : generateUID()
  const obj = {
    id: key,
    ..._formatComment(postId, body)
  }

  if (commentId) {
    return _put(`comments/${commentId}`, obj)
  }
  else {
    return _post('comments', obj)
  }


}

export function savePost(postId, title, body, author, category) {
  const key = postId ? postId : generateUID()
  const post = {
    id: key,
    ..._formatPost(title, body, author, category)
  }

  if (postId) {
    return _put(`posts/${postId}`, { title, body })
  }
  else {
    return _post('posts', post)
  }
}

export function deleteComment(commentId) {
  return _delete(`comments/${commentId}`)
}

export function deletePost(postId) {
  return _delete(`posts/${postId}`)
}

export function voteComment(commentId, vote) {
  return _post(`comments/${commentId}`, { option: vote })
}

export function votePost(postId, vote) {
  return _post(`posts/${postId}`, { option: vote })
}

function _getCategories() {
  return _get('categories')
    .then(res => res.categories)
}

function _getPosts() {
  return _get('posts')
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

function _delete(url, value) {
  return _request(
    url,
    '',
    "DELETE")
}

function _put(url, value) {
  return _request(
    url,
    JSON.stringify(value),
    "PUT",
    { 'Content-Type': 'application/json' }
  )
}

function _post(url, value) {
  return _request(
    url,
    JSON.stringify(value),
    "POST",
    { 'Content-Type': 'application/json' }
  )
}

function _get(url) {
  return _request(url)
}

function _request(url, content = '', method = "GET", header = {}) {
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
    .then(res => res.json())
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