import styles from "./order-create-page.module.css";
import React from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../utils/types";
import {orderSelector} from "../../services/actions/actionsSelector";
import Loader from "../../components/loader/loader";
import OrderDetails from "../../components/order-details/order-details";

export default function OrderCreatePage() {
    const {number} = useParams<{ number: string }>();
    const order = useAppSelector(orderSelector);

    return (
        <div className={styles.container}>
            {
                !order.number && <Loader/>
            }
            {order.number > 0 && <OrderDetails/>}
        </div>
    )
}