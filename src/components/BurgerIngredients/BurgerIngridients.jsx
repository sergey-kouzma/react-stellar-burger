import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientsListPropType} from '../../utils/prop-types';
import styles from './BurgerIngredients.module.css';
import React, { useMemo, useRef, useState } from "react";
import IngredientsList from "./IngredientsList/IngredientsList";
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';

const BurgerIngredients = ({ ingredients }) => {

  const [isModalOpened, setModalOpened] = React.useState(false);
  const [openedIngredient, setOpenedIngredient] = React.useState();
 
  const handleOpenIngredient = (ingredient) => {
    console.log('Будем открывать модалку');
    setModalOpened(true);
    setOpenedIngredient(ingredient);
  }
  console.log(typeof handleOpenIngredient);


  const handleCloseModal = () => {
    setModalOpened(false);
  }

  const buns = useMemo(() => {
    return ingredients.filter(item => item.type === 'bun');
  }, [ingredients]);
  
  const sauces = useMemo(() => {
    return ingredients.filter(item => item.type === 'sauce');
  }, [ingredients]);
  
  const mains = useMemo(() => {
    return ingredients.filter(item => item.type === 'main');
  }, [ingredients]) 

  const tabRefs = {
    buns: useRef(null),
    sauces: useRef(null),
    mains: useRef(null)
  }
  const [currentType, setCurrentType] = useState('buns');

  const onTabClick = (tab) => {
    setCurrentType(tab);
    tabRefs[tab].current.scrollIntoView({ behavior: "smooth" })

  }
  
  return(
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.header}`}>
        Соберите бургер
      </h1>
      <div  className={styles.menu}>
        <Tab value="buns" active={currentType === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentType === "sauces"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentType === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.main} custom-scroll`}>
        <IngredientsList handleOpenIngredient={handleOpenIngredient} category={'Булки'} items={buns} ref={tabRefs.buns}/>
        <IngredientsList handleOpenIngredient={handleOpenIngredient} category={'Соусы'} items={sauces} ref={tabRefs.sauces} />
        <IngredientsList handleOpenIngredient={handleOpenIngredient} category={'Начинки'} items={mains} ref={tabRefs.mains} />
      </div>
      {isModalOpened && (
        <Modal onModalClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails data={openedIngredient} />
        </Modal>
      )}
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: ingredientsListPropType.isRequired,
};

export default BurgerIngredients;