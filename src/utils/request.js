import axios from "axios";

axios.interceptors.request.use(config => {
    NProgress.start()
    // 登录授权 请求验证是否有token  需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
    config.headers.Authorization = window.sessionStorage.getItem('Lljieeeeee-Token')
    return config // 必须返回否则没有值
})

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
})

export default service
