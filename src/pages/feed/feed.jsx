import React from "react";
import styles from "./feed.module.css";
import clsx from "clsx";
import OrderList from "../../components/order-list/order-list";

export default function Feed() {
    return (
        <>
            <section className={clsx(styles.orders, "mr-10")}>
                <h1 className={"text text_type_main-large mt-10 mb-5"}>Лента заказов</h1>
                <OrderList/>
            </section>
            {/*<DashBoard/>*/}
        </>
    )
}