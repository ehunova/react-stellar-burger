import React from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import clsx from "clsx";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export default function Modal(props) {
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay onClose={props.onClose}>
                    <div className={clsx(styles.container, "pb-10")}>
                        <div className={clsx(styles.head, "mt-10 ml-10 mr-10")}>
                            <h2 className="text text_type_main-large">{props.title}</h2>
                            <button className={styles.button} onClick={props.onClose}>
                                <CloseIcon type="primary"/>
                            </button>
                        </div>
                        {props.children}
                    </div>
                </ModalOverlay>
            </>
        ),
        modalRoot
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.element.isRequired
};