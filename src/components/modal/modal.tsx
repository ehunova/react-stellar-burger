import React, {ReactNode} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import clsx from "clsx";
import useEscapeHandler from "../../hooks/use-escape-handler";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

type TModalProps = {
    onClose: () => void;
    title?: string;
    titleClassName?: string;
    children?: ReactNode;
}

export default function Modal(props: TModalProps) {
    useEscapeHandler(props.onClose);

    if (!modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay onClose={props.onClose}>
                <div className={clsx(styles.container, "pb-10")} onClick={(event) => event.stopPropagation()}>
                    <div className={clsx(styles.head, "mt-10 ml-10 mr-10")}>
                        <h2 className={clsx(props.titleClassName ?? "text_type_main-large", "text")}>{props.title}</h2>
                        <button className={styles.button} onClick={props.onClose}>
                            <CloseIcon type="primary"/>
                        </button>
                    </div>
                    {props.children}
                </div>
            </ModalOverlay>
        ),
        modalRoot
    )
}