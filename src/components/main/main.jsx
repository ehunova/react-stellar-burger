import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import styles from "./main.module.css";
import clsx from "clsx";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export default function Main() {
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <section className={clsx(styles.ingredients, "mr-10")}>
                    <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                    <BurgerIngredients/>
                </section>
                <BurgerConstructor/>
            </DndProvider>
        </>
    )
}