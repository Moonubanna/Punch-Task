
import {
    BASE_URL, API
} from '../constants'

import {
    getItuneSongApiReq,
    getItuneSongApiSuccess,
    getItuneSongApiFailed

} from '../actionCreators'
import axios from 'axios'

export const getItuneSongApi = (userData) => async dispatch => {

    await dispatch(getItuneSongApiReq(userData))
    let url = API.GET_SEARCH_ITUNE + userData.search;
    console.log('request data:--', url);

    return axios.get(
        url, {
        headers: {
            'content-type': 'application/json',
        }
    }).then((res) => {
        dispatch(getItuneSongApiSuccess(res.data))
        return (res.data)
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(getItuneSongApiFailed(message))
            return (err)
        })
}