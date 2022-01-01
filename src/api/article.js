import request from "@/utils/request";

export function getArticlePage(current, size) {
    return request({
        method: 'get',
        url: `/article/${current}/${size}`
    })
}

export function getRecycleArticlePage(current, size) {
    return request({
        method: 'get',
        url: `/article/getRecycleArticlePage/${current}/${size}`
    })
}

export function getArticleById(id) {
    return request({
        method: 'get',
        url: `/article/${id}`
    })
}

export function addArticle(article, articleCategoryList, articleTagList) {
    return request({
        method: 'post',
        url: `/article`,
        data: {article, articleCategoryList, articleTagList}
    })
}
export function updateArticle(article, articleCategoryList, articleTagList) {
    return request({
        method: 'put',
        url: `/article`,
        data: {article, articleCategoryList, articleTagList}
    })
}

export function updateArticleStatus(articleId, status) {
    return request({
        method: 'post',
        url: `/article/${articleId}/${status}`
    })
}
