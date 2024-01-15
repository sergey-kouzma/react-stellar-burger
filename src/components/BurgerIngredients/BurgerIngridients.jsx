import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import { useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import IngredientsList from "./IngredientsList/IngredientsList";
import Modal from '../Modal/Modal';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import { useModal } from '../../hooks/useModal';
import { RESET_CURRENT_INGREDIENT, SET_CURRENT_INGREDIENT } from '../../services/actions/currentIngredient';
import { SET_INGREDIENTS_TAB } from '../../services/actions/tabs';


const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const { isModalOpened, openModal, closeModal } = useModal();

  const { currentIngredient } = useSelector(store => store);
  const { tabs } = useSelector(store => store.tabs);

 
  const handleOpenIngredient = (ingredient) => {
    openModal(true);
    dispatch({ type: SET_CURRENT_INGREDIENT, data: ingredient });
  }

  const handleCloseIngredient = () => {
    dispatch({ type: RESET_CURRENT_INGREDIENT });
    closeModal();
  }

  const onTabClick = (tabCategory) => {
    dispatch({type: SET_INGREDIENTS_TAB, id: tabCategory, move: true});
  }

  const handleScroll = (e) => {
    let bestShift;
    let bestId;
    const containerTop = e.target.getBoundingClientRect().top;
    tabs.forEach(tab => {
      const tabTop = tab.refToList.current.getBoundingClientRect().top;
      const tabShift = tabTop > containerTop ? tabTop - containerTop : containerTop - tabTop;

      if (!bestId || tabShift < bestShift) {
        bestShift = tabShift;
        bestId = tab.id;
      }
    });
  
    tabs.forEach(tab => {
      if (tab.active) {
        if (tab.category !== bestId) {
          dispatch({type: SET_INGREDIENTS_TAB, id: bestId});
        }
      }
    });
  }

  const ingredientsByTabs = useMemo(() => {
    return tabs.map((tab) => {
      return {
        tab: tab,
        ingredients: ingredients.filter(item => item.type === tab.id)
      }
    });
  }, [ingredients, tabs]) 
  
  return(
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.header}`}>
        Соберите бургер
      </h1>
      <div  className={styles.menu}>
        {tabs.map((tab) => ( 
          <Tab value={tab.id} key={tab.id} active={tab.active} onClick={onTabClick}>
            {tab.category}
          </Tab>
        ))}
        
      </div>
      <div className={`${styles.main} custom-scroll`} onScroll={handleScroll}>
        {ingredientsByTabs.map((ingredientOfTab) => ( 
          <IngredientsList 
            handleOpenIngredient={handleOpenIngredient} 
            category={ingredientOfTab.tab.category} 
            items={ingredientOfTab.ingredients} 
            key={ingredientOfTab.tab.id}
          />
        ))}
      </div>
      {isModalOpened && (
        <Modal onModalClose={handleCloseIngredient} title="Детали ингредиента">
          <IngredientDetails data={currentIngredient} />
        </Modal>
      )}
    </section>
  )
}

export default BurgerIngredients;