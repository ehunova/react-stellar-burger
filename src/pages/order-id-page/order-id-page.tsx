import {useAppDispatch, useAppSelector} from "../../utils/types";
import {orderInfoSelector} from "../../services/actions/actionsSelector";
import {useParams} from "react-router-dom";
import styles from "../order-id-page/order-id-page.module.css";
import React, {useEffect} from "react";
import {fetchOrderInfo} from "../../services/reducers/order-info-slice";
import OrderInfo from "../../components/order-info/order-info";
import clsx from "clsx";

export default function OrderIdPage() {
    const dispatch = useAppDispatch();
    const order = useAppSelector(orderInfoSelector);
    const {id} = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderInfo(id));
        }
    }, [])

    if (!order) {
        return null;
    }

    return (
        <div className={styles.container}>
            <p className={clsx(styles.number, "text text_type_digits-default")}>{`#${order.number}`}</p>
            <OrderInfo order={order}/>
        </div>
    )
}