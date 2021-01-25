import request from '@/utils/request.js'
export function get_pay_demand_list(data) {
    return request({
        url: "finance/get_pay_demand_list",
        method: "post",
        data
    })
}