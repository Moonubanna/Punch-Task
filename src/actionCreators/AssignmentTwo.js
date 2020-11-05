import {
    APP_ASIGN_TWO_ITUNE_REQUEST,
    APP_ASIGN_TWO_ITUNE_SUCESS,
    APP_ASIGN_TWO_ITUNE_FAIL,
  
  } from '../constants'
  
  //get ALL Song
  export function getItuneSongApiReq(data) {
    return { type: APP_ASIGN_TWO_ITUNE_REQUEST, payload: data }
  }
  
  export function getItuneSongApiSuccess(user) {
    return { type: APP_ASIGN_TWO_ITUNE_SUCESS, payload: user }
  }
  
  export function getItuneSongApiFailed(user) {
    return { type: APP_ASIGN_TWO_ITUNE_FAIL, payload: user }
  }
  

  
  