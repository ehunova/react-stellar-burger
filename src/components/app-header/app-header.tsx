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
                        <NavigationLink className={'text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2'} link="/">
                            <>
                                <BurgerIcon type={path === "/" ? "primary" : "secondary"}/>
                                <span className="ml-2">Конструктор</span>
                            </>
                        </NavigationLink>
                        <NavigationLink className={'text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2'} link="/feed">
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
                        <NavigationLink className={'text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2'} link="/profile">
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