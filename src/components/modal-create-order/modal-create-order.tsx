import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../utils/types";
import {orderSelector} from "../../services/actions/actionsSelector";
import React from "react";
import Modal from "../modal/modal";
import Loader from "../loader/loader";
import OrderDetails from "../order-details/order-details";

export default function ModalCreateOrder() {
    const navigate = useNavigate();
    const order = useAppSelector(orderSelector);

    // Какой путь должен быть у модального окна?
    // Номер заказа мы получаем с задержкой в 15сек, на основе чего его строить? О_о

    return (

        <Modal onClose={() => navigate('/')}>
            {
                !order.number && <Loader/>
            }
            {order.number > 0 && <OrderDetails/>}
        </Modal>

    )
}