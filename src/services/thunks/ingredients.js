import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

import {BASE_URL} from '../../utils/api';
import {getFetchResultData} from '../../utils/getFetchResultData';
export const INGREDIENTS_URL =   BASE_URL + '/ingredients';

export const getIngredients = (ingredientsURL) => {
    return async (dispatch) => {
        try{
            dispatch({ 
                type: GET_INGREDIENTS_REQUEST 
            });
            
            const res = await fetch(`${INGREDIENTS_URL}`);
            const data = await getFetchResultData(res);
            
            dispatch({ 
                type: GET_INGREDIENTS_SUCCESS, 
                ingredients: data.data
            });
        }
        catch(err){
            dispatch({ 
                type: GET_INGREDIENTS_FAILED
            }); 
        }
    }    
}

