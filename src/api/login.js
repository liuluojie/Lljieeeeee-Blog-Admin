import request from "@/utils/request";

export function login(user) {
    return request({
        method: 'post',
        url: `/login/login`,
        data: user
    })
}
