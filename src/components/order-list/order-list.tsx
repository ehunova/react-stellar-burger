import React from "react";
import styles from "./order-list.module.css"
import OrderCard from "../order-card/order-card";
import clsx from "clsx";
import {useAppSelector} from "../../utils/types";
import {ordersSelector} from "../../services/actions/actionsSelector";

export default function OrderList () {
    const orders = useAppSelector(ordersSelector);

    return (
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.box, "pr-2")}>
                {
                    orders.map(order => {
                        return (
                            <OrderCard key={order._id} order={order}/>
                        )
                    })
                }
            </div>

        </div>
    )
}