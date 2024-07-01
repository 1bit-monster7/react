import request from '@/api/request'

export function getDashboardData(query) {
    return request({
        url: '/getDashboardData',
        method: 'get',
        params: query
    })
}
