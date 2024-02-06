import React, {ReactNode} from "react";
import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
    onClose: () => void;
    children?: ReactNode;
}

export default function ModalOverlay(props: TModalOverlayProps) {
    return (
        <div className={styles.overlay} onClick={props.onClose}>
            {props.children}
        </div>
    )
}