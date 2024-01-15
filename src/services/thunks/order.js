import {    
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED
} from '../actions/order';

import {BASE_URL} from '../../utils/api';
export const ORDER_URL = BASE_URL + '/orders';

export const sendOrder = (ingredients) => {
    return async (dispatch) => {       
        
        const requestBody = {
            ingredients: ingredients.map(item => item._id)
        };
        
        try {
            dispatch({
                type: SEND_ORDER_REQUEST
            })
            const res = await fetch(`${ORDER_URL}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody)
            });
    
            if (!res.ok) {
                throw new Error('');
            }

            const data = await res.json();
            console.log(data);

            dispatch({ 
                type: SEND_ORDER_SUCCESS,
                data
            });

        }
        catch(err){
            dispatch({
                type: SEND_ORDER_FAILED
            });
        }
    }
}