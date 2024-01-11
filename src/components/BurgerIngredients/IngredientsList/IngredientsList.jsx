import IngredientItem from "../IngredientItem/IngredientItem";
import styles from './IngredientsList.module.css';
import PropTypes from "prop-types";
import {ingredientsListPropType} from '../../../utils/prop-types';

import { forwardRef } from "react";

const IngredientsList = forwardRef((props, ref) => {
  const { category, items, handleOpenIngredient} = props;
  console.log(handleOpenIngredient);

  return(
    <div ref={ref}>
      <h1 className={`text text_type_main-medium ${styles.header}`} id={`${category}`}>{category}</h1>
      <ul className={`${styles.list}`}>
        {items.map(item => <IngredientItem key={item._id} handleOpenIngredient={handleOpenIngredient} item={item}/>)}
      </ul>
    </div>
  )
})

IngredientsList.propTypes = {
  category: PropTypes.string.isRequired,
  items: ingredientsListPropType.isRequired,
}

export default IngredientsList;
