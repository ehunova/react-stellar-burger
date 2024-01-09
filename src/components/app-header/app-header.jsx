import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";
import clsx from "clsx";
import NavigationLink from "../navigation-link/navigation-link";

export default function AppHeader() {
    return (
        <header className={clsx("pt-4 pb-4", styles.header)}>
            <nav className={styles.container}>
                <div className={styles.navigations}>
                    <NavigationLink link="#">
                        <>
                            <BurgerIcon type="secondary"/>
                            <span className="ml-2">Конструктор</span>
                        </>
                    </NavigationLink>
                    <NavigationLink link="#">
                        <>
                            <ListIcon type="secondary"/>
                            <span className="ml-2">Лента заказов</span>
                        </>

                    </NavigationLink>
                </div>
                <div>
                    <NavigationLink link="#">
                        <Logo/>
                    </NavigationLink>
                </div>
                <div>
                    <NavigationLink link="#">
                        <>
                            <ProfileIcon type="secondary"/>
                            <span className="ml-2">Личный кабинет</span>
                        </>
                    </NavigationLink>
                </div>
            </nav>
        </header>
    )
}