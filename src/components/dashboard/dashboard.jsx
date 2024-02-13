import React from "react";
import styles from "./dashboard.module.css";
import clsx from "clsx";
import OrdersStatus from "../orders-status/orders-status";

export default function Dashboard() {
    return (
        <div className={clsx(styles.container, "mt-25")}>
            <div className={styles.status}>
                <div className={styles.orders}>
                    <h3 className={"text text_type_main-medium"}>Готовы:</h3>
                    <OrdersStatus color={styles.done}/>
                </div>
                <div className={styles.orders}>
                    <h3 className={"text text_type_main-medium"}>В работе:</h3>
                    <OrdersStatus/>
                </div>
            </div>
            <div>
                <h3 className={"text text_type_main-medium"}>Выполнено за все время:</h3>
                <p className={clsx(styles.ordersCount, "text text_type_digits-large")}>28 752</p>
            </div>
            <div>
                <h3 className={"text text_type_main-medium"}>Выполнено за сегодня:</h3>
                <p className={clsx(styles.ordersCount, "text text_type_digits-large")}>138</p>
            </div>
        </div>
    )
}