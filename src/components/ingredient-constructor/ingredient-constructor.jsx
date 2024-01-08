import React from "react";
import styles from "./ingredient-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function IngredientConstructor({ingredient}) {
    return (
        <div className={styles.container}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
            />
        </div>
    )
}

IngredientConstructor.propTypes = {
    ingredient: PropTypes.object
};