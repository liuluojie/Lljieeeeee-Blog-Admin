import request from "@/utils/request";


export function getUserInfoByToken() {
  return request({
    method: 'get',
    url: `/user/getUserInfoByToken`,
  })
}
