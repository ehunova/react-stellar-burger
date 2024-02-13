import React from "react";
import styles from "./orders-status.module.css";
import clsx from "clsx";

export default function OrdersStatus(props) {
    return (
        <div className={clsx(styles.container, props.color)}>
            <p className={"text text_type_digits-default"}>3453</p>
            <p className={"text text_type_digits-default"}>3453</p>
            <p className={"text text_type_digits-default"}>3453</p>
            <p className={"text text_type_digits-default"}>3453</p>
        </div>
    )
}