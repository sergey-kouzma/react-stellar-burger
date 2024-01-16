import { v4 as uuidv4 } from 'uuid';
import {    
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR_INGREDIENTS
} from '../actions/burgerConstructor';

const initialBurgerConstrluctorState = {
    loading: true,
    error: false,
    constructorIngredients: []
}

function array_move(arr, from, to) {
    if (from === to) return arr;
    const res = [];
    if (from > to) {
        arr.forEach((el, i) => {
            if (i < to || i > from) {
                res[i] = el;
            }
            else if (i === to) {
                res[i] = arr[from];
            }
            else {
                res[i] = arr[i-1]
            }
        });
    }
    else {
        to--;
        arr.forEach((el, i) => {
            if (i > to || i < from) {
                res[i] = el;
            }
            else if (i === to) {
                res[i] = arr[from];
            }
            else {
                res[i] = arr[i+1]
            }
        });
    }
    
    return res;
};

const burgerConstructorReducer =  (state = initialBurgerConstrluctorState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            const uuid = uuidv4();
            if (action.item.type === 'bun') {
                const bunIndex = state.constructorIngredients.findIndex(item => item.type === 'bun');
                let newConstructorIngredients;
                if (bunIndex === -1)  {
                    newConstructorIngredients = [{...action.item, uuid: uuid }, ...state.constructorIngredients]
                }
                else {
                    newConstructorIngredients = [{...action.item, uuid: uuid }, ...state.constructorIngredients.slice(1)]
                }
                return {
                    ...state,
                   constructorIngredients: newConstructorIngredients 
                }
            }

            const newIngredients = [...state.constructorIngredients, {...action.item, uuid: uuid } ];
            const elementsBefore = action.elementsBefore;
            const bunPosition = state.constructorIngredients.findIndex(item => item.type === 'bun');
            const newPosition = bunPosition === -1 ? elementsBefore : elementsBefore + 1;
            return {
                ...state,
               constructorIngredients: array_move(newIngredients, newIngredients.length - 1, newPosition)
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: state.constructorIngredients.filter(ingredient => ingredient.uuid !== action.uuid)
            }
        }
        case MOVE_INGREDIENT: {  
            
            const elementsBefore = action.elementsBefore;
            const prevUuid = action.item.uuid;
            const bunPosition = state.constructorIngredients.findIndex(item => item.type === 'bun');
            const elementOldPosition = state.constructorIngredients.findIndex(item => item.uuid === prevUuid);
            const newPosition = bunPosition === -1 ? elementsBefore : elementsBefore + 1;
            
            return {
                ...state,
                constructorIngredients: array_move(state.constructorIngredients, elementOldPosition, newPosition)
            }
        }
        case CLEAR_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: []
            }
        }
        default: return state;
    }
}

export default burgerConstructorReducer;
