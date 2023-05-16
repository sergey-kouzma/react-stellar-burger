import styles from "./app.module.css";
import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const API_URL = "https://norma.nomoreparties.space/api";

function App() {
  const [productsData, setProductsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    const getProductsData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/ingredients`);
        const adata = await res.json();
        setProductsData(adata.data);
        setError(false);
      } catch {
        setError(true);
        setProductsData(null);
      } finally {
        setLoading(false);
      }
    };
    getProductsData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.page}>
        {loading ? (
          <p>...Загрузка</p>
        ) : error ? (
          <p className={`${styles.error}`}>Ошибка загрузки</p>
        ) : (
          <>
            <BurgerIngredients ingredients={productsData} />
            <BurgerConstructor ingredients={productsData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;