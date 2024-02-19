import styles from "../profile/profile.module.css";
import React from "react";
import {Location, Outlet, useLocation} from "react-router-dom";
import NavigationLink from "../../components/navigation-link/navigation-link";
import clsx from "clsx";
import {fetchLogOut} from "../../services/reducers/auth-slice";
import {TFromLocation, useAppDispatch} from "../../utils/types";

export default function Profile() {
    const location: Location<TFromLocation> = useLocation();
    const path = location.pathname;
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(fetchLogOut());
    }

    return (
        <section className={styles.container}>
            <div className={styles.navContainer}>
                <nav className={styles.navbar}>
                    <NavigationLink className={clsx(styles.link, "text text_type_main-medium")} link="/profile">
                        <span className={path === "/profile"
                            ? styles.linkActive
                            : styles.linkInactive
                        }>
                            Профиль
                        </span>
                    </NavigationLink>
                    <NavigationLink className={clsx(styles.link, "text text_type_main-medium")} link="/profile/orders">
                        <span>История заказов</span>
                    </NavigationLink>
                    <NavigationLink className={clsx(styles.link, "text text_type_main-medium")} link="/">
                        <span onClick={onLogout}>Выход</span>
                    </NavigationLink>
                </nav>
                <p className={clsx(styles.text, "text text_type_main-default mt-20")}>В этом разделе вы можете изменить
                    свои персональные данные</p>
            </div>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </section>
    )
}