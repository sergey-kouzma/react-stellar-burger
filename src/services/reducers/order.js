import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    RESET_ORDER_REQUEST
} from '../actions/order';

const initialOrderState = {
    orderData: {},
    loading: false,
    error: false,
};

const orderReducer =  (state = initialOrderState, action) => {
    switch(action.type){
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                loading: false,
                orderData: action.data,
                error: false,
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                orderData: {},
                loading: false,
                error: true
            }
        }
        case RESET_ORDER_REQUEST: {
            return {
                initialOrderState
            }
        }
        default:
            return state;
    }
}

export default orderReducer;