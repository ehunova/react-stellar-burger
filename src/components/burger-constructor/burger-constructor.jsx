import React from "react";
import {Button, ConstructorElement, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import clsx from "clsx";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import useModal from "../../hooks/use-modal";

export default function BurgerConstructor({ingredients}) {
    const [total, setTotal] = React.useState(0);
    const {modalState, openModal, closeModal} = useModal();

    const modal = (<Modal onClose={closeModal}>
        <OrderDetails id={34536}/>
    </Modal>);

    return (
        <>
            <section className={clsx(styles.section, "mt-25 ml-4")}>
                <div className={styles.container}>
                    <div className={"ml-8"}>
                        {
                            ingredients.map(ingredient => {
                                if (ingredient.type === "bun" && ingredient.name === "Краторная булка N-200i") {
                                    return (
                                        <ConstructorElement
                                            key={ingredient._id + "top"} type={"top"} isLocked={true}
                                            text={`${ingredient.name} (верх)`} thumbnail={ingredient.image}
                                            price={ingredient.price}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                    <div className={styles.main}>
                        {
                            ingredients.map(ingredient => {
                                if (ingredient.type !== "bun") {
                                    return (<IngredientConstructor key={ingredient._id} ingredient={ingredient}/>)
                                }
                            })
                        }
                    </div>
                    <div className={"ml-8"}>
                        {
                            ingredients.map(ingredient => {
                                if (ingredient.type === "bun" && ingredient.name === "Краторная булка N-200i") {
                                    return (
                                        <ConstructorElement
                                            key={ingredient._id + "bottom"} type={"bottom"} isLocked={true}
                                            text={`${ingredient.name} (низ)`} thumbnail={ingredient.image}
                                            price={ingredient.price}
                                        />
                                    )
                                }
                            })
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

BurgerConstructor.propTypes = {
    ingredients: PropTypes.array
};