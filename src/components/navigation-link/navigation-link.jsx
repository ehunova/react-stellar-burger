import clsx from "clsx";
import styles from "./navigation-link.module.css";
import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function NavigationLink(props) {
    const getActiveClass = ({isActive}) => (isActive ? styles.linkActive : styles.link) + ' text text_type_main-default pl-5 pr-5 pb-4 pt-4 mr-2';

    return (
        <NavLink className={getActiveClass} to={props.link}>
            {props.children}
        </NavLink>
    )
}

NavigationLink.propTypes = {
    link: PropTypes.string,
    children: PropTypes.element.isRequired
};