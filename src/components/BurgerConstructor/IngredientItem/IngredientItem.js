import { useRef } from "react";
import { useDrag } from 'react-dnd';
import styles from "./IngredientItem.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { DELETE_INGREDIENT } from "../../../services/actions/burgerConstructor";

const IngredientItem = ({ingredient}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);


    const handleDelete = (e) => {
        const ingredientOrderNum = Number(e.target.closest(`.${styles.ingredient}`).dataset.orderNum);
        dispatch({
            type: DELETE_INGREDIENT,
            orderNum: ingredientOrderNum
        })
    }
    
    const [, drag] = useDrag({
        type: 'cartIngredient',
        item: () => {
            return {...ingredient, ref: ref};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(ref);


    return (
        <div 
            data-order-num={ingredient.orderNum} 
            className={styles.ingredient} 
            ref={ref}
            data-id={ingredient.orderNum}
        >
            <DragIcon type="primary" />
            <ConstructorElement
            price={ingredient.price}
            text={ingredient.name}
            thumbnail={ingredient.image}
            handleClose={handleDelete}
            
        />
    </div>);
}

export default IngredientItem;