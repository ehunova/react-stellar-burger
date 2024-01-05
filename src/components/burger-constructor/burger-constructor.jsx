import React from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import clsx from "clsx";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";

export default function BurgerConstructor({ingredients}) {
    const [total, setTotal] = React.useState(0);

    return (
        <section className={clsx(styles.section, "mt-25 ml-4")}>
            <div className={styles.container}>
                <div className={"ml-8"}>
                    {
                        ingredients.map(ingredient => {
                            if (ingredient.type === "bun" && ingredient.name === "Краторная булка N-200i") {
                                return <ConstructorElement
                                    key={ingredient._id} type={"top"} isLocked={true}
                                    text={`${ingredient.name} (верх)`} thumbnail={ingredient.image}
                                    price={ingredient.price}
                                />
                            }
                        })
                    }
                </div>
                <div className={styles.main}>
                    {
                        ingredients.map(ingredient => {
                            if (ingredient.type !== "bun") {
                                return <IngredientConstructor ingredient={ingredient}/>
                            }
                        })
                    }
                </div>
                <div className={"ml-8"}>
                    {
                        ingredients.map(ingredient => {
                            if (ingredient.type === "bun" && ingredient.name === "Краторная булка N-200i") {
                                return <ConstructorElement
                                    key={ingredient._id} type={"bottom"} isLocked={true}
                                    text={`${ingredient.name} (низ)`} thumbnail={ingredient.image}
                                    price={ingredient.price}
                                />
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
                    <Button htmlType="button" type="primary" size="medium">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}
