import { combineReducers } from "redux";
import ingredients from './ingredients';
import order from './order';
import currentIngredient from './currentIngredient';
import tabs from "./tabs";
import burgerConstructor from "./burgerConstructor";

const rootReducer = combineReducers({
    ingredients,
    order,
    currentIngredient,
    tabs,
    burgerConstructor
});

export default rootReducer;