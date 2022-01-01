import request from "@/utils/request";
import ta from "element-ui/src/locale/lang/ta";

export function getTagMap() {
    return request({
        method: 'get',
        url: `/tag/getTagMap`
    })
}

export function getAllTag() {
    return request({
        method: 'get',
        url: `/tag/getAllTag`
    })
}

export function getTagPage(current, size) {
    return request({
        method: 'get',
        url: `/tag/${current}/${size}`
    })
}

export function getTagById(tagId) {
    return request({
        method: 'get',
        url: `/tag/${tagId}`
    })
}

export function addTag(tag) {
    return request({
        method: 'post',
        url: `/tag`,
        data: tag
    })
}

export function updateTag(tag) {
    return request({
        method: 'put',
        url: `/tag`,
        data: tag
    })
}

export function deleteTag(tagId) {
    return request({
        method: 'delete',
        url: `/tag/${tagId}`
    })
}


