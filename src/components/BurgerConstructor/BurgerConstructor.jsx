import { useMemo, useRef } from "react";
import styles from "./BurgerConstructor.module.css";
import {  } from '../../utils/prop-types';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import {
    ADD_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR_INGREDIENTS, 
} from '../../services/actions/burgerConstructor';
import { sendOrder } from '../../services/thunks/order';
import { useDrop } from 'react-dnd';

import Modal from "../Modal/Modal";
import OrderDetails from "./OrderDetails/OrderDetails";
import { useModal } from "../../hooks/useModal";
import IngredientItem from "./IngredientItem/IngredientItem";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const {
        loading, 
        error,
        orderData
      } = useSelector(store => store.order);
    const { constructorIngredients } = useSelector(store => store.burgerConstructor);
    const totalPrice = useSelector(store => store.burgerConstructor.constructorIngredients.reduce((accumulator, elem) => {
        return accumulator + elem.price * (elem.type === 'bun' ? 2 : 1)
    }, 0));
    let elementsBefore = 0;

    const { isModalOpened, openModal, closeModal } = useModal();

    const bun = useMemo(() => {
        return constructorIngredients.find(item => item.type === 'bun');
    }, [constructorIngredients]);

    const innerIngredients = useMemo(() => {
        return constructorIngredients.filter(item => item.type !== 'bun');
    }, [constructorIngredients]);

    const bunElementSettings = {
        isLocked: true,
        price: bun ? bun.price : 0,
        thumbnail: bun ? bun.image : ''
    };

    const onDropIngredient = (item) => {
        if (item.orderNum === undefined) {
            dispatch({
                type: ADD_INGREDIENT,
                item: item,
                elementsBefore: elementsBefore
            })
        }   
        else {
            dispatch({
                type: MOVE_INGREDIENT,
                item: item,
                elementsBefore: elementsBefore
            });
        }
    }

    const [{isConstructorHover}, dropAllTarget] = useDrop({
        accept: ['bun'],
        drop(item) {
            return onDropIngredient(item, elementsBefore);
        },
        collect: monitor => {
            return {
                isConstructorHover: monitor.isOver(),
            }
        },
    });

    const [{isIngredientHover}, dropIngredientsTarget] = useDrop({
        accept: ['sauce', 'main', 'cartIngredient'],
        drop(item) {
            return onDropIngredient(item, elementsBefore);
        },
        collect: monitor => {
            return {
                isIngredientHover: monitor.isOver(),
            }
        },
        hover(item, monitor) {
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            const actualShift = clientOffset.y - hoverBoundingRect.top;// + ref.current.scrollTop;
            const children = ref.current.children;
            elementsBefore = 0;
            for (let elem of children) {
                let elemRect = elem.getBoundingClientRect();
                let elemMiddle = (elemRect.top + elemRect.bottom) / 2;
                if (elemMiddle - hoverBoundingRect.top > actualShift) {
                    break;
                }
                elementsBefore++;
            }
        }
    });
    dropIngredientsTarget(ref);

    const hoverClass = isIngredientHover || isConstructorHover ? styles.hover : '';

    const handleOrderClick = () => {
        if(constructorIngredients.findIndex(item => item.type === 'bun') === -1) return;
        dispatch(sendOrder(constructorIngredients));
        dispatch({ type: CLEAR_CONSTRUCTOR_INGREDIENTS });
        openModal();
    }

    return (
        <div className={`${styles.constructor} ${hoverClass}`} ref={dropAllTarget}>
            <div className={`${styles.burger} text text_type_main-default`}>
                <div className={`${styles.ingredient} ${styles.bun}`}>
                    {bun && <ConstructorElement
                        {...bunElementSettings}
                        text={bun.name + " (верх)"}
                        type="top"
                    />}
                </div>
                <div className={`${styles.ingredients} custom-scroll`}  ref={ref}>
                    {innerIngredients &&
                        innerIngredients.map((ingredient, index) => (
                            <IngredientItem key={ingredient.orderNum} ingredient = {ingredient} />
                        ))}
                </div>
                <div className={`${styles.ingredient} ${styles.bun}`}>
                    {bun && <ConstructorElement
                        {...bunElementSettings}
                        text={bun.name + " (низ)"}
                        type="bottom"
                        
                    />}
                </div>
            </div>
            <div className={styles.order}>
                <div className={`${styles.total} text text_type_main-default mr-10`}>
                    <p className="text text_type_digits-medium mr-3">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpened && (
                <Modal onModalClose={closeModal}>
                    {loading ? (
                        <p>...Загрузка</p>
                        ) : error ? (
                        <p>Ошибка загрузки</p>
                        ) : (
                            
                            <OrderDetails orderId={orderData.order.number} />
                    )}
                    
                </Modal>
            )}
        </div>
    );
};

export default BurgerConstructor;
