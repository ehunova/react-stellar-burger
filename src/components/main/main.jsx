import React from "react";
import PropTypes from 'prop-types';
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import styles from "./main.module.css";
import clsx from "clsx";
import {useSelector} from "react-redux";

export default function Main() {
    return (
        <main className={styles.container}>
            <section className={clsx(styles.ingredients, "mr-10")}>
                <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                <BurgerIngredients/>
            </section>
            <BurgerConstructor/>
        </main>
    )
}



