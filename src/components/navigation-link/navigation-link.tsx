import styles from "./navigation-link.module.css";
import React, {ReactNode} from "react";
import {NavLink} from "react-router-dom";

type NavigationLinkProps = {
    className?: string;
    link: string;
    children?: ReactNode;
}

export default function NavigationLink(props: NavigationLinkProps) {
    const getActiveClass = ({isActive}: {isActive: boolean}): string => (isActive ? styles.linkActive : styles.link) + " " + props.className;

    return (
        <NavLink className={getActiveClass} to={props.link}>
            {props.children}
        </NavLink>
    )
}