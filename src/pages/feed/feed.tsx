import React, {useEffect} from "react";
import styles from "./feed.module.css";
import clsx from "clsx";
import OrderList from "../../components/order-list/order-list";
import Dashboard from "../../components/dashboard/dashboard";
import {useAppDispatch, useAppSelector} from "../../utils/types";
import {wsEnd, wsStart} from "../../services/actions/actions";
import {wsUrl} from "../../services/constants/constants";
import {ordersSelector} from "../../services/actions/actionsSelector";

export default function Feed() {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(ordersSelector);

    useEffect(() => {
        dispatch(wsStart(`${wsUrl}/all`));

        return () => {
            dispatch(wsEnd());
        }
    }, []);

    return (
        <>
            <section className={clsx(styles.orders, "mr-10")}>
                <h1 className={"text text_type_main-large mt-10 mb-5"}>Лента заказов</h1>
                <OrderList orders={orders}/>
            </section>
            <Dashboard/>
        </>
    )
}