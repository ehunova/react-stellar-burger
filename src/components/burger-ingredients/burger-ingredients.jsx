import React from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import Ingredient from "../ingredient/ingredient";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import {REMOVE_VIEWING_INGREDIENT} from "../../services/constants/constants";

export default function BurgerIngredients() {
    const ingredients = useSelector(store => store.ingredientsList);
    const [current, setCurrent] = React.useState("bun");

    const viewingIngredient = useSelector(store => store.viewingIngredient);
    const dispatch = useDispatch();

    const modal = (<Modal title={"Детали ингредиента"} onClose={() => dispatch({type: REMOVE_VIEWING_INGREDIENT})}>
        <IngredientInfo ingredient={viewingIngredient}/>
    </Modal>);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.tab}>
                    <Tab value="bun" active={current === "bun"} onClick={setCurrent}>Булки</Tab>
                    <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>Соусы</Tab>
                    <Tab value="main" active={current === "main"} onClick={setCurrent}>Начинки</Tab>
                </div>
                <div className={clsx(styles.category, "mt-10")}>
                    <h2 className={clsx("text text_type_main-medium")}>Булки</h2>
                    <div className={clsx(styles.ingredients, "mt-6 ml-4")}>
                        {
                            ingredients.map(ingredient => {
                                if (ingredient.type === "bun") {
                                    return (
                                        <Ingredient key={ingredient._id} ingredient={ingredient}/>
                                    )
                                }
                            })
                        }
                    </div>
                    <h2 className={clsx("text text_type_main-medium mt-10")}>Соусы</h2>
                    <div className={clsx(styles.ingredients, "mt-6 ml-4")}>
                        {
                            ingredients.map(ingredient => {
                                if (ingredient.type === "sauce") {
                                    return (
                                        <Ingredient key={ingredient._id} ingredient={ingredient}/>
                                    )
                                }
                            })
                        }
                    </div>
                    <h2 className={clsx("text text_type_main-medium mt-10")}>Начинки</h2>
                    <div className={clsx(styles.ingredients, "mt-6 ml-4")}>
                        {
                            ingredients.map(ingredient => {
                                if (ingredient.type === "main") {
                                    return (
                                        <Ingredient key={ingredient._id} ingredient={ingredient}/>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {viewingIngredient && modal}
        </>
    )
}