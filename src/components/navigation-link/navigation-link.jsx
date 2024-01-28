import styles from "./navigation-link.module.css";
import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

export default function NavigationLink(props) {
    const getActiveClass = ({isActive}) => (isActive ? styles.linkActive : styles.link) + " " + props.className;

    return (
        <NavLink className={getActiveClass} to={props.link}>
            {props.children}
        </NavLink>
    )
}

NavigationLink.propTypes = {
    className: PropTypes.string,
    link: PropTypes.string,
    children: PropTypes.element.isRequired
};