import {post} from '../utils/request'

export function loginApi(url, data) {
    return post(url, data)
}