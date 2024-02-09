import React from "react";
import styles from "./order-card.module.css";
import clsx from "clsx";
import {Link, Location, useLocation} from "react-router-dom";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TFromLocation} from "../../utils/types";

export default function OrderCard() {
    const location/*: Location<TFromLocation>*/ = useLocation();
    const path = location.pathname === "/profile/orders";

    return (
        <Link to={"/"} className={styles.main}/* state={{background: location}} */>
            <div className={clsx(styles.container, "mt-6 mr-6 mb-6 ml-6")}>
                <div className={clsx(styles.head)}>
                    <h3 className={"text text_type_digits-default"}>#034535</h3>
                    <p className={"text text_type_main-default text_color_inactive"}>Сегодня, 16:20 i-GMT+3 </p>
                </div>
                <div>
                    <h2 className={"text text_type_main-medium mt-6"}>Death Star Starship Main бургер</h2>
                </div>
                {
                    path && <p className={"text text_type_main-default mt-2"}>Статус заказа</p>
                }

                <div className={clsx(styles.details, "mt-6")}>
                    <div className={styles.iconsList}>
                        <div className={styles.iconContainer}>
                            <img alt="Фото" src={"https://code.s3.yandex.net/react/code/bun-01.png"} className={styles.icon}></img>
                        </div>
                        <div className={styles.iconContainer}>
                            <img alt="Фото" src={"https://code.s3.yandex.net/react/code/bun-01.png"} className={styles.icon}></img>
                        </div>
                        <div className={styles.iconContainer}>
                            <img alt="Фото" src={"https://code.s3.yandex.net/react/code/bun-01.png"} className={styles.icon}></img>
                        </div>
                        <div className={styles.iconContainer}>
                            <img alt="Фото" src={"https://code.s3.yandex.net/react/code/bun-01.png"} className={styles.icon}></img>
                        </div>
                        <div className={styles.iconContainer}>
                            <img alt="Фото" src={"https://code.s3.yandex.net/react/code/bun-01.png"} className={styles.icon}></img>
                        </div>
                        <div className={clsx(styles.iconContainer, styles.count)}>
                            <img alt="Фото" src={"https://code.s3.yandex.net/react/code/cheese.png"} className={styles.icon}></img>
                            <p className={clsx(styles.countText, "text text_type_main-default")}>+3</p>
                        </div>
                    </div>
                    <div className={styles.total}>
                        <p className="text text_type_digits-default">488</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </Link>
    )
}