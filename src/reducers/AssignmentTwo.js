
import {
    APP_ASIGN_TWO_ITUNE_REQUEST,
    APP_ASIGN_TWO_ITUNE_SUCESS,
    APP_ASIGN_TWO_ITUNE_FAIL,
    
    } from '../constants'
    
    const initialState = {
      error: undefined,
      loading: false,
      data: undefined
    }
    
    export default (state = initialState, action) => {
    
      switch (action.type) {
        case APP_ASIGN_TWO_ITUNE_REQUEST:
          return { ...state, error: undefined, loading: true }
    
        case APP_ASIGN_TWO_ITUNE_FAIL:
          return { ...state, error: action.error, loading: false }
    
        case APP_ASIGN_TWO_ITUNE_SUCESS:
          return {
            ...state,
            loading: false,
            data: { ...action.payload }
          }
        default: return state
      }
    }