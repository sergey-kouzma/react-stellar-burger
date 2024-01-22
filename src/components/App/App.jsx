import styles from "./App.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { getIngredients } from '../../services/thunks/ingredients';

function App() {
  const dispatch = useDispatch();
  const {
    loading, 
    error
  } = useSelector(store => store.ingredients);

  

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.page}>
        {loading ? (
          <p>...Загрузка</p>
        ) : error ? (
          <p className={`${styles.error}`}>Ошибка загрузки</p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </div>
  );
}

export default App;
