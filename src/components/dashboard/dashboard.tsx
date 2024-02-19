import React from "react";
import styles from "./dashboard.module.css";
import clsx from "clsx";
import {useAppSelector} from "../../utils/types";
import {ordersSelector, totalSelector, totalTodaySelector} from "../../services/actions/actionsSelector";

export default function Dashboard() {
    const orders = useAppSelector(ordersSelector);
    const total = useAppSelector(totalSelector);
    const totalToday = useAppSelector(totalTodaySelector);

    return (
        <div className={clsx(styles.container, "mt-25")}>
            <div className={styles.status}>
                <div className={styles.orders}>
                    <h3 className={"text text_type_main-medium"}>Готовы:</h3>
                    <div className={clsx(styles.orderNum, styles.done)}>
                        {
                            orders.map(order => {
                                if (order.status === "done") {
                                    return (
                                        <p className={"text text_type_digits-default"} key={order._id}>{order.number}</p>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </div>
                <div className={styles.orders}>
                    <h3 className={"text text_type_main-medium"}>В работе:</h3>
                    <div className={styles.orderNum}>
                        {
                            orders.map(order => {
                                if (order.status !== "done") {
                                    return (
                                        <p className={"text text_type_digits-default"} key={order._id}>{order.number}</p>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <h3 className={"text text_type_main-medium"}>Выполнено за все время:</h3>
                <p className={clsx(styles.ordersCount, "text text_type_digits-large")}>{total}</p>
            </div>
            <div>
                <h3 className={"text text_type_main-medium"}>Выполнено за сегодня:</h3>
                <p className={clsx(styles.ordersCount, "text text_type_digits-large")}>{totalToday}</p>
            </div>
        </div>
    )
}