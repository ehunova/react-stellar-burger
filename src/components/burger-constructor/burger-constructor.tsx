import React from "react";
import {Button, ConstructorElement, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import clsx from "clsx";
import IngredientConstructor from "../ingredient-constructor/ingredient-constructor";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import useModal from "../../hooks/use-modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {v4 as uuid} from "uuid";
import {
    burgerConstructorSelector,
    orderSelector,
    orderTotalSelector,
    userSelector
} from "../../services/actions/actionsSelector";
import {
    addFilling,
    clearConstructor,
    removeFillingElement,
    setBun
} from "../../services/reducers/burger-constructor-slice";
import {fetchOrder} from "../../services/reducers/order-slice";
import {useNavigate} from "react-router-dom";
import {TIngredient, TIngredientConstructor} from "../../utils/types";

type TCollectedProps = { isDropIngredient: boolean; };

export default function BurgerConstructor() {
    const burgerConstructor: TIngredientConstructor = useSelector(burgerConstructorSelector);
    const total = useSelector(orderTotalSelector);
    const order = useSelector(orderSelector);
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {modalState, openModal, closeModal} = useModal();

    const [{isDropIngredient}, dropRefIngredient] = useDrop<TIngredient, unknown, TCollectedProps>({
        accept: "ingredient",
        drop(ingredient) {
            if (ingredient.type === "bun") {
                dispatch(setBun(ingredient));
            } else {
                dispatch(addFilling({...ingredient,
                    uuid: uuid()}));
            }
        },
        collect: (monitor) => ({
            isDropIngredient: monitor.isOver(),
        })
    })

    const ingredientIdList = (): Array<string> => {
        const list = [];

        if (burgerConstructor.bun !== null) {
            list.push(burgerConstructor.bun._id)
        }

        burgerConstructor.filling.filter(ingredient => {
            list.push(ingredient._id);
        })

        if (burgerConstructor.bun !== null) {
            list.push(burgerConstructor.bun._id)
        }

        return list;
    }

    const createOrder = () => {
        if (burgerConstructor.bun == null) {
            return;
        }

        if (!user) {
            navigate('/login');
            return;
        }

        dispatch(fetchOrder(ingredientIdList()));
        openModal();
        dispatch(clearConstructor());
    }

    const modal = (<Modal onClose={closeModal}>
        <OrderDetails orderNumber={order.number}/>
    </Modal>);

    return (
        <>
            <section className={clsx(styles.section, "mt-25 ml-4")}>
                <div className={clsx(styles.container, isDropIngredient ? styles.dragging : '')}
                     ref={dropRefIngredient}>
                    <div className={"ml-8"}>
                        {burgerConstructor.bun &&
                            <ConstructorElement
                                type={"top"} isLocked={true}
                                text={`${burgerConstructor.bun.name} (верх)`} thumbnail={burgerConstructor.bun.image}
                                price={burgerConstructor.bun.price}
                            />
                        }
                    </div>
                    <div className={styles.main}>
                        {
                            burgerConstructor.filling.map((ingredient, index) => {
                                return (<IngredientConstructor
                                    key={ingredient.uuid}
                                    ingredient={ingredient}
                                    handleRemove={
                                        () => dispatch(removeFillingElement(index))}
                                    index={index}
                                />)
                            })
                        }
                    </div>
                    <div className={"ml-8"}>
                        {burgerConstructor.bun &&
                            <ConstructorElement
                                type={"bottom"} isLocked={true}
                                text={`${burgerConstructor.bun.name} (низ)`} thumbnail={burgerConstructor.bun.image}
                                price={burgerConstructor.bun.price}
                            />
                        }
                    </div>
                </div>

                <div className={clsx(styles.createOrder, "mt-10")}>
                    <div className={styles.totalPrice}>
                        <p className="text text_type_digits-medium">{total}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <div>
                        <Button htmlType="button" type="primary" size="medium" onClick={createOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </section>
            {modalState && modal}
        </>
    )
}