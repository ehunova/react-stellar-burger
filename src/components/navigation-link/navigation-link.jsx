import clsx from "clsx";
import styles from "./navigation-link.module.css";
import React from "react";

export default function NavigationLink(props) {
    return (
        <a className={clsx(styles.link, 'text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2')} href={props.link}>
            {props.children}
        </a>
    )
}