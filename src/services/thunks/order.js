import {    
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED
} from '../actions/order';

import {BASE_URL} from '../../utils/api';
import {getFetchResultData} from '../../utils/getFetchResultData';
export const ORDER_URL = BASE_URL + '/orders';

export const sendOrder = (ingredients) => {
    return async (dispatch) => {       
        const ingredientsToRequest = ingredients;
        const bun = ingredientsToRequest.find(item => item.type === 'bun');
        ingredientsToRequest.push(bun);

        const requestBody = {
            ingredients: ingredientsToRequest.map(item => item._id)
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
    
            const data = await getFetchResultData(res);

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