import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/ingredients';

const initialIngredientsState = {
    loading: true,
    error: false,
    ingredients: [],
}

const ingredientsReducer =  (state = initialIngredientsState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                loading: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredients: [],
                failed: true,
                loading: false
            }
        }
        default: return state;
    }
}

export default ingredientsReducer;