import React, {useEffect} from "react";
import OrderList from "../../components/order-list/order-list";
import {useAppDispatch, useAppSelector} from "../../utils/types";
import {wsEnd, wsStart} from "../../services/actions/actions";
import {wsUrl} from "../../services/constants/constants";
import {userOrdersSelector} from "../../services/actions/actionsSelector";

export default function OrdersHistory () {
    const dispatch = useAppDispatch();
    const userOrders = useAppSelector(userOrdersSelector);
    const orders = [...userOrders].reverse();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const token = accessToken.slice(7);
            dispatch(wsStart(`${wsUrl}?token=${token}`));
        }

        return () => {
            dispatch(wsEnd());
        }
    }, []);

    return (
        <>
            <OrderList orders={orders}/>
        </>
    )
}