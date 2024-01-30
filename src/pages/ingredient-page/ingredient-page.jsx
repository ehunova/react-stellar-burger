import React from "react";
import styles from "./ingredient-page.module.css";
import IngredientInfo from "../../components/ingredient-info/ingredient-info";
import {useSelector} from "react-redux";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {useParams} from "react-router-dom";

export default function IngredientPage() {
    const ingredients = useSelector(ingredientsListSelector);
    const {id} = useParams();

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