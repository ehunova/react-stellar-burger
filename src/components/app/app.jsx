import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Modal from "../modal/modal";
import IngredientInfo from "../ingredient-info/ingredient-info";

function App() {
    function openModal() {

    }

    function closeModal() {

    }

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Main/>
        </div>
    );
}

export default App;