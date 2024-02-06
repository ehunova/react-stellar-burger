import {useEffect} from "react";

export default function useEscapeHandler(onEscape: () => void): void {
    useEffect(() => {
        const listenEscape = (event: KeyboardEvent) => {
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
