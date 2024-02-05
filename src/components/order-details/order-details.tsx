import React from "react";
import styles from "./order-details.module.css";
import iconDone from "../../images/icon-done.svg"
import clsx from "clsx";
import Loader from "../loader/loader";

type TOrderDetails = {
    orderNumber: number;
}

export default function OrderDetails(props: TOrderDetails) {
    return (
        <div className={clsx(styles.container, "mt-20 mb-30")}>
            {
                !props.orderNumber && <Loader/>
            }
            <h3 className={clsx(styles.orderNum, "text text_type_digits-large")}>{props.orderNumber}</h3>
            <p className={"text text_type_main-medium mt-8"}>идентификатор заказа</p>
            <img className={clsx(styles.iconDone, "mt-15 mb-15")} src={iconDone} alt="Заказ создан"/>
            <p className={"text text_type_main-default"}>Ваш заказ начали готовить</p>
            <p className={clsx(styles.textWait, "text text_type_main-default mt-2")}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}