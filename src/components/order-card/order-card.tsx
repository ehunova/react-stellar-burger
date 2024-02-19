import React from "react";
import styles from "./order-card.module.css";
import clsx from "clsx";
import {Link, Location, useLocation} from "react-router-dom";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TFromLocation, TFullOrder, useAppSelector} from "../../utils/types";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {collectOrderIngredients, getStatus, totalPriceOrder} from "../../utils/utils";

type TOrderCardProps = {
    order: TFullOrder;
}

export default function OrderCard({order}: TOrderCardProps) {
    const location: Location<TFromLocation> = useLocation();
    const path = location.pathname === "/profile/orders";
    const ingredients = useAppSelector(ingredientsListSelector);

    const date = new Date(order.createdAt);
    const timeZone = date.getTimezoneOffset() * (-1) / 60;

    let orderIngredients = collectOrderIngredients(order, ingredients);
    let totalPrice = totalPriceOrder(orderIngredients);

    const status = getStatus(order);

    const getPath = !path ? `/feed/${order.number}` : `/profile/orders/${order.number}`;

    return (
        <Link to={getPath} className={styles.main} state={{background: location}}>
            <div className={clsx(styles.container, "mt-6 mr-6 mb-6 ml-6")}>
                <div className={clsx(styles.head)}>
                    <h3 className={"text text_type_digits-default"}>{`#${order.number}`}</h3>
                    <div>
                        <FormattedDate date={date} className={"text text_type_main-default text_color_inactive"}/>
                        <span
                            className={"text text_type_main-default text_color_inactive"}>{` i-GMT+${timeZone}`}</span>
                    </div>
                </div>
                <div>
                    <h2 className={"text text_type_main-medium mt-6"}>{order.name}</h2>
                </div>
                {
                    path && <p className={clsx("text text_type_main-default mt-2",
                        order?.status === "pending"
                            ? styles.statusPending
                            : {color: "#FFF"}
                    )
                    }>
                        {
                            status
                        }
                    </p>
                }

                <div className={clsx(styles.details, "mt-6")}>
                    <div className={styles.iconsList}>
                        {
                            orderIngredients.slice(0, 5).map((ingredient, index) => {
                                return (
                                    <div key={index} className={styles.iconContainer}>
                                        <img alt={ingredient.name} src={ingredient.image} className={styles.icon}></img>
                                    </div>
                                )
                            })
                        }
                        {
                            orderIngredients.length > 5 && (
                                <div className={clsx(styles.iconContainer, styles.count)}>
                                    <img alt="Фото" src={"https://code.s3.yandex.net/react/code/cheese.png"}
                                         className={styles.icon}></img>
                                    <p className={clsx(styles.countText, "text text_type_main-default")}>{`+${orderIngredients.length - 5}`}</p>
                                </div>
                            )
                        }

                    </div>
                    <div className={styles.total}>
                        <p className="text text_type_digits-default">{totalPrice}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    )
}