import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './IngredientItem.module.css';
import {ingredientPropType} from '../../../utils/prop-types';

function IngredientItem({item}) {
  const counter = 0;
 
  const handleOpenModal = () => {
    console.log('Будем открывать модалку');
  }

  return(
    <li className={styles.item} type='button' onClick={handleOpenModal}>
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