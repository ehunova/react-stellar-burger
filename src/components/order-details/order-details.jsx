import React from "react";
import styles from "./order-details.module.css";
import iconDone from "../../images/icon-done.svg"
import clsx from "clsx";
import PropTypes from "prop-types";

export default function OrderDetails(props) {
    return (
        <div className={clsx(styles.container, "mt-20 mb-30")}>
            <h3 className={clsx(styles.orderNum, "text text_type_digits-large")}>{props.id}</h3>
            <p className={"text text_type_main-medium mt-8"}>идентификатор заказа</p>
            <img className={clsx(styles.iconDone, "mt-15 mb-15")} src={iconDone} alt="Заказ создан"/>
            <p className={"text text_type_main-default"}>Ваш заказ начали готовить</p>
            <p className={clsx(styles.textWait, "text text_type_main-default mt-2")}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    id: PropTypes.number
};