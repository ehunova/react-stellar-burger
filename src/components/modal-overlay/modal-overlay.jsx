import React from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
    return (
        <div className={styles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element.isRequired
};