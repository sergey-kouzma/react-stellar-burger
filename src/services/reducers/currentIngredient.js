import {    
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../actions/currentIngredient';

const initialIngredientState = {}

const currentIngredientReducer =  (state = initialIngredientState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT: {
            return action.data;
        }
        case RESET_CURRENT_INGREDIENT: {
            return initialIngredientState;

        }
        default: return state;
    }
}

export default currentIngredientReducer;