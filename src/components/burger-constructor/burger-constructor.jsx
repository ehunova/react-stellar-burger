import React from "react";
import {Button, ConstructorElement, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import clsx from "clsx";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import useModal from "../../hooks/use-modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {REMOVE_FILLING_ELEMENT, SET_BUN, SET_FILLING} from "../../services/constants/constants";

export default function BurgerConstructor() {
    const burgerConstructor = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const total =
        (burgerConstructor.bun !== null ? burgerConstructor.bun.price * 2 : 0) + burgerConstructor.filling.reduce(
            (sum, ingredient) => sum + ingredient.price, 0);

    const {modalState, openModal, closeModal} = useModal();

    const [{isDrag}, dropRef] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            if (ingredient.type === "bun") {
                dispatch({type: SET_BUN, payload: ingredient})
            } else {
                dispatch({type: SET_FILLING, payload: [...burgerConstructor.filling, ingredient]})
            }
        },
        collect: (monitor) => ({
            isDrag: monitor.isOver(),
        })
    })

    const modal = (<Modal onClose={closeModal}>
        <OrderDetails id={34536}/>
    </Modal>);

    return (
        <>
            <section className={clsx(styles.section, "mt-25 ml-4")}>
                <div className={clsx(styles.container, isDrag ? styles.dragging : '')} ref={dropRef}>
                    <div className={"ml-8"}>
                        {burgerConstructor.bun &&
                            <ConstructorElement
                                type={"top"} isLocked={true}
                                text={`${burgerConstructor.bun.name} (верх)`} thumbnail={burgerConstructor.bun.image}
                                price={burgerConstructor.bun.price}
                            />
                        }
                    </div>
                    <div className={styles.main}>
                        {
                            burgerConstructor.filling.map((ingredient, index) => {
                                return (<IngredientConstructor
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    handleRemove={
                                        () => dispatch({
                                            type: REMOVE_FILLING_ELEMENT,
                                            payload: index,
                                        })}
                                />)
                            })
                        }
                    </div>
                    <div className={"ml-8"}>
                        {burgerConstructor.bun &&
                            <ConstructorElement
                                type={"bottom"} isLocked={true}
                                text={`${burgerConstructor.bun.name} (низ)`} thumbnail={burgerConstructor.bun.image}
                                price={burgerConstructor.bun.price}
                            />
                        }
                    </div>
                </div>

                <div className={clsx(styles.createOrder, "mt-10")}>
                    <div className={styles.totalPrice}>
                        <p className="text text_type_digits-medium">{total}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div>
                        <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {modalState && modal}
        </>
    )
}