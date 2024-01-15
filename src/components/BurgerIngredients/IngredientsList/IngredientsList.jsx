import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import IngredientItem from "../IngredientItem/IngredientItem";
import styles from './IngredientsList.module.css';
import PropTypes from "prop-types";
import {ingredientsListPropType} from '../../../utils/prop-types';
import { SET_TAB_REF } from '../../../services/actions/tabs';


const IngredientsList = (props) => {
  const currentRef = useRef(null);
  const { category, items, handleOpenIngredient} = props;
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch({
          type: SET_TAB_REF,
          category: category,
          refToList: currentRef
        });
  }, [dispatch, category]);

  return(
    <div ref={currentRef}>
      <h1 className={`text text_type_main-medium ${styles.header}`} id={`${category}`}>{category}</h1>
      <ul className={`${styles.list}`}>
        {items.map(item => <IngredientItem key={item._id} handleOpenIngredient={handleOpenIngredient} item={item}/>)}
      </ul>
    </div>
  )
}

IngredientsList.propTypes = {
  category: PropTypes.string.isRequired,
  items: ingredientsListPropType.isRequired,
}

export default IngredientsList;
