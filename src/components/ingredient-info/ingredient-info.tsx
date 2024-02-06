import React from "react";
import styles from "./ingredient-info.module.css";
import clsx from "clsx";
import {TIngredient} from "../../utils/types";

type TIngredientInfo = {
    ingredient: TIngredient;
}

export default function IngredientInfo({ingredient}: TIngredientInfo) {
    return (
        <div className={styles.container}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <h3 className={"text text_type_main-medium mt-4 mb-8"}>{ingredient.name}</h3>
            <ul className={styles.info}>
                <li className={clsx(styles.list, "mr-5")}>
                    <p className={"text text_type_main-default"}>Калории,ккал</p>
                    <p className={"text text_type_digits-default"}>{ingredient.calories}</p>
                </li>
                <li className={clsx(styles.list, "mr-5")}>
                    <p className={"text text_type_main-default"}>Белки, г</p>
                    <p className={"text text_type_digits-default"}>{ingredient.proteins}</p>
                </li>
                <li className={clsx(styles.list, "mr-5")}>
                    <p className={"text text_type_main-default"}>Жиры, г</p>
                    <p className={"text text_type_digits-default"}>{ingredient.fat}</p>
                </li>
                <li className={styles.list}>
                    <p className={"text text_type_main-default"}>Углеводы, г</p>
                    <p className={"text text_type_digits-default"}>{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}