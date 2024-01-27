import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";
import clsx from "clsx";
import NavigationLink from "../navigation-link/navigation-link";
import {Outlet, useLocation} from "react-router-dom";

export default function AppHeader() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <>
            <header className={clsx("pt-4 pb-4", styles.header)}>
                <nav className={styles.container}>
                    <div className={styles.navigations}>
                        <NavigationLink link="/">
                            <>
                                <BurgerIcon type={path === "/" ? "primary" : "secondary"}/>
                                <span className="ml-2">Конструктор</span>
                            </>
                        </NavigationLink>
                        <NavigationLink link="/feed">
                            <>
                                <ListIcon type={path === "/feed" ? "primary" : "secondary"}/>
                                <span className="ml-2">Лента заказов</span>
                            </>

                        </NavigationLink>
                    </div>
                    <div>
                        <NavigationLink link="/">
                            <Logo/>
                        </NavigationLink>
                    </div>
                    <div>
                        <NavigationLink link="/profile">
                            <>
                                <ProfileIcon type={path === "/profile" ? "primary" : "secondary"}/>
                                <span className="ml-2">Личный кабинет</span>
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