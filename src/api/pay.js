import request from '@/utils/request.js'
export function get_pay_demand_list(data) {
    return request({
        url: "finance/get_pay_demand_list",
        method: "post",
        data
    })
}
// 获取账本列表
export function get_financial_book_list(data) {
    return request({
        url: 'finance/get_financial_book_list',
        method: "post",
        data
    })
}