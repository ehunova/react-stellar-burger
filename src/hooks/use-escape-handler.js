import React, {useEffect} from "react";

export default function useEscapeHandler(onEscape) {
    useEffect(() => {
        const listenEscape = (event) => {
            if (event.key === "Escape") {
                onEscape();
            }
        };
        window.addEventListener('keydown', listenEscape);

        return () => {
            window.removeEventListener('keydown', listenEscape);
        };
    }, []);
}
