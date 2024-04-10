import request from '@/utils/request'

export const getMapSvg = () => {
    return request({
        url: 'https://echarts.apache.org/examples/data/asset/geo/MacOdrum-LV5-floorplan-web.svg',
        method: 'get'
    })
}