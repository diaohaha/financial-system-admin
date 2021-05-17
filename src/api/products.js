import Request from '@/utils/request'

export function list(data) {
  return Request.post('/products/search', data)
}
export function edit(data) {
  return Request.post('/products/edit', data)
}
export function add(data) {
  return Request.post('/products/add', data)
}
export function del(data) {
  return Request.post('/products/del', data)
}
