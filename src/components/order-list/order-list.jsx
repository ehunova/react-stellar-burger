import React from "react";
import styles from "./order-list.module.css"
import OrderCard from "../../components/order-card/order-card";
import clsx from "clsx";

export default function OrderList () {
    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.box, "pr-2")}>
                <OrderCard/>
            </div>

        </div>
    )
}