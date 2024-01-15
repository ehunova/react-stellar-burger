import React from "react";
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {ADD_VIEWING_INGREDIENT} from "../../services/constants/constants";

export default function Ingredient({ingredient}) {
    const dispatch = useDispatch();

    return (
        <div className={styles.container} onClick={() => dispatch({type: ADD_VIEWING_INGREDIENT, payload: ingredient})}>
            <div className={styles.counter}>
                <Counter count={1} size="default"/>
            </div>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={clsx(styles.priceContainer, "mt-1 mb-1")}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </div>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object
};
