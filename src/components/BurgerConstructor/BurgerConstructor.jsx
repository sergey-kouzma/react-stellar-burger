import React, { useMemo, useRef, useState } from "react";
import styles from "./BurgerConstructor.module.css";
import { ingredientsListPropType } from '../../utils/prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";

const BurgerConstructor = ({ ingredients }) => {
    const [isModalOpened, setModalOpened] = React.useState(false);

    const bun = useMemo(() => {
        return ingredients.find(item => item.type === 'bun');
    }, [ingredients]);

    const innerIngredients = useMemo(() => {
        return ingredients.filter(item => item.type !== 'bun');
    }, [ingredients]);

    const [totalPrice, setTotalPrice] = React.useState(610);

    const handleOpenOrder = (el) => {
        setModalOpened(true);
    };

    const handleCloseModal = () => {
        setModalOpened(false);
    }

    const bunElementSettings = {
        isLocked: true,
        price: bun.price,
        thumbnail: bun.image
    };

    return (
        <div className={styles.constructor}>
            <div className={`${styles.burger} text text_type_main-default`}>
                <div className={`${styles.ingredient} ${styles.bun}`}>
                    <ConstructorElement
                        {...bunElementSettings}
                        text={bun.name + " (верх)"}
                        type="top"
                    />
                </div>
                <div className={`${styles.ingredients} custom-scroll`}>
                    {innerIngredients &&
                        innerIngredients.map((ingredient, index) => (
                            <div key={ingredient._id} className={styles.ingredient}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    price={ingredient.price}
                                    text={ingredient.name}
                                    thumbnail={ingredient.image}
                                />
                            </div>
                        ))}
                </div>
                <div className={`${styles.ingredient} ${styles.bun}`}>
                    <ConstructorElement
                        {...bunElementSettings}
                        text={bun.name + " (низ)"}
                        type="bottom"
                    />
                </div>
            </div>
            <div className={styles.order}>
                <div className={`${styles.total} text text_type_main-default mr-10`}>
                    <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOpenOrder}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpened && (
                <Modal onModalClose={handleCloseModal}>
                    <OrderDetails orderId="034536" />
                </Modal>
            )}
        </div>
    );
};

BurgerConstructor.propTypes = {
    ingredients: ingredientsListPropType.isRequired,
};

export default BurgerConstructor;