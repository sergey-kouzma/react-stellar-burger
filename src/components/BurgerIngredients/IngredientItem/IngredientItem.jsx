
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientItem.module.css';
import {ingredientPropType} from '../../../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from "react-redux";

function IngredientItem({item, handleOpenIngredient}) {
  const counter = useSelector(
    store => store.burgerConstructor.constructorIngredients
      .filter(elem => elem._id === item._id)
      .reduce((accumulator, elem) => {
        return accumulator + 1 * (elem.type === 'bun' ? 2 : 1)
      }, 0)
  );
  const [ , dragRef ] = useDrag({
    type: item.type,
    item: item,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
  });


  return(
    <li className={styles.item} type='button' onClick={() => handleOpenIngredient(item)} ref={dragRef}>
      {
        counter > 0 
        ? (<Counter count={counter} size={counter < 100 ? "default" : "small"} extraClass="m-1"/>) 
        : null
      }
      <img src={item.image} alt={item.name} className={styles.img}/>
      <div className={styles.price}>
        <span className="text text_type_digits-default">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.description} text text_type_main-default`}>{item.name}</p>
    </li>
  )
}

IngredientItem.propTypes = {
  item: ingredientPropType.isRequired
}

export default IngredientItem