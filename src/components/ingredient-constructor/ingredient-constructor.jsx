import React from "react";
import styles from "./ingredient-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function IngredientConstructor({ingredient, handleRemove}) {
    return (
        <div className={styles.container}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                handleClose={handleRemove}
            />
        </div>
    )
}

IngredientConstructor.propTypes = {
    ingredient: PropTypes.object
};