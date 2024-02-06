import React, {useCallback} from "react";

type TUseModal = {
    modalState: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export default function useModal(): TUseModal {
    const [modalState, setModalState] = React.useState<boolean>(false);

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