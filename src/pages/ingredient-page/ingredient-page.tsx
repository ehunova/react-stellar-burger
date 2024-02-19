import React from "react";
import styles from "./ingredient-page.module.css";
import IngredientInfo from "../../components/ingredient-info/ingredient-info";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {useParams} from "react-router-dom";
import {TIngredient, useAppSelector} from "../../utils/types";

export default function IngredientPage() {
    const ingredients: TIngredient[] = useAppSelector(ingredientsListSelector);
    const {id} = useParams<{ id: string }>();

    const ingredient = ingredients.find(ingredient => ingredient._id === id);

    return (
        <div className={styles.container}>
            <h2 className="text text_type_main-large">Детали ингредиента</h2>
            {
                ingredient && (
                    <IngredientInfo ingredient={ingredient}/>
                )
            }
        </div>
    )
}