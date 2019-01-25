import axios from 'axios'

const ERR_OK = 0

export function get(url) {
    return function(param) {
        return axios.get(url, {
            param
        }).then((res) => {
            const { errno, data } = res.data
            if (errno === ERR_OK) {
                return data
            }
        }).catch(() => {

        })
    }
}
