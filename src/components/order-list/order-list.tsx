import React from "react";
import styles from "./order-list.module.css"
import OrderCard from "../order-card/order-card";
import clsx from "clsx";
import {TFullOrder} from "../../utils/types";

type TOrderListProps = {
    orders: TFullOrder[];
}

export default function OrderList ({orders}: TOrderListProps) {
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