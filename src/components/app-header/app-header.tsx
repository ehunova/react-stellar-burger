import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";
import clsx from "clsx";
import NavigationLink from "../navigation-link/navigation-link";
import {Location, Outlet, useLocation} from "react-router-dom";
import {TFromLocation} from "../../utils/types";

export default function AppHeader() {
    const location: Location<TFromLocation> = useLocation();
    const path = location.pathname;

    return (
        <>
            <header className={clsx("pt-4 pb-4", styles.header)}>
                <nav className={styles.container}>
                    <div className={styles.navigations}>
                        <NavigationLink className={"pl-5 pr-5 pb-4 pt-4 mr-2"} link="/">
                            <>
                                <BurgerIcon type={path === "/" ? "primary" : "secondary"}/>
                                <span className={clsx("text text_type_main-default ml-2",
                                    path === "/"
                                        ? styles.active
                                        : styles.inactive
                                )}>
                                    Конструктор
                                </span>
                            </>
                        </NavigationLink>
                        <NavigationLink className={"pl-5 pr-5 pb-4 pt-4 mr-2"} link="/feed">
                            <>
                                <ListIcon type={path === "/feed" ? "primary" : "secondary"}/>
                                <span className={clsx("text text_type_main-default ml-2",
                                    path === "/feed"
                                        ? styles.active
                                        : styles.inactive
                                )}>
                                    Лента заказов
                                </span>
                            </>

                        </NavigationLink>
                    </div>
                    <div>
                        <NavigationLink link="/">
                            <Logo/>
                        </NavigationLink>
                    </div>
                    <div>
                        <NavigationLink className={"pl-5 pr-5 pb-4 pt-4 mr-2"} link="/profile">
                            <>
                                <ProfileIcon type={path === "/profile" ? "primary" : "secondary"}/>
                                <span className={clsx("text text_type_main-default ml-2",
                                    path === "/profile"
                                        ? styles.active
                                        : styles.inactive
                                )}>
                                    Личный кабинет
                                </span>
                            </>
                        </NavigationLink>
                    </div>
                </nav>
            </header>
            <main className={styles.main}>
                <Outlet/>
            </main>
        </>
    )
}