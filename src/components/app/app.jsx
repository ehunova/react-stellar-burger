import React, {useEffect} from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import {useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/reducers/ingredients-slice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Main/>
        </div>
    );
}

export default App;