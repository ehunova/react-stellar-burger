import React, {useCallback} from "react";

export default function useModal() {
    const [modalState, setModalState] = React.useState(false);

    const openModal = useCallback(() => {
        setModalState(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalState(false);
    }, []);

    return {
        modalState,
        openModal,
        closeModal,
    };
}