import React from "react";
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";
import PropTypes from "prop-types";

export default function Ingredient({ingredient}) {
    const [modalState, setModalState] = React.useState(false);

    function openModal() {
        setModalState(true);
    }

    function closeModal() {
        setModalState(false);
    }

    const modal = (<Modal title={"Детали ингредиента"} onClose={closeModal}>
        <IngredientInfo ingredient={ingredient}/>
    </Modal>);

    return (
        <>
            <div className={styles.container} onClick={openModal}>
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
            {modalState && modal}
        </>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.object
};
