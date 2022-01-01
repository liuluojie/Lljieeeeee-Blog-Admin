import request from "@/utils/request";

export function getCategoryMap() {
    return request({
        method: 'get',
        url: `/category/getCategoryMap`
    })
}

export function getAllCategory() {
    return request({
        method: 'get',
        url: `/category/getAllCategory`
    })
}

export function getCategoryPage(current, size) {
    return request({
        method: 'get',
        url: `/category/${current}/${size}`
    })
}

export function addCategory(category) {
    return request({
        method: 'post',
        url: `/category`,
        data: category
    })
}

export function updateCategory(category) {
    return request({
        method: 'put',
        url: `/category`,
        data: category
    })
}

export function deleteCategory(categoryId) {
    return request({
        method: 'delete',
        url: `/category/${categoryId}`,
    })
}

