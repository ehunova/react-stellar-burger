import React, {FC} from "react";
import styles from "./ingredient-page.module.css";
import IngredientInfo from "../../components/ingredient-info/ingredient-info";
import {useSelector} from "react-redux";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {useParams} from "react-router-dom";
import {TIngredient} from "../../utils/types";

export default function IngredientPage() {
    const ingredients: TIngredient[] = useSelector(ingredientsListSelector);
    const {id} = useParams<{ id: string }>();

    const ingredient = ingredients.find(ingredient => ingredient._id === id);

    return (
        <div className={styles.container}>
            {
                ingredient && (
                    <IngredientInfo ingredient={ingredient}/>
                )
            }
        </div>
    )
}