import {TFromLocation, useAppDispatch, useAppSelector} from "../../utils/types";
import {orderInfoSelector} from "../../services/actions/actionsSelector";
import {Location, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchOrderInfo} from "../../services/reducers/order-info-slice";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";

export default function ModalOrderId() {
    const location: Location<TFromLocation> = useLocation();
    const navigate = useNavigate();
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

    const getPath = location.pathname === `/profile/orders/${order.number}` ? `/profile/orders` : `/feed`;

    return (
        <>
            {
                <Modal onClose={() => navigate(getPath)} titleClassName={"text_type_digits-default"} title={`#${order.number}`}>
                    <OrderInfo order={order}/>
                </Modal>
            }
        </>
    )
}