import moment from 'moment'

export const formatTime = (time: string) => {
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}