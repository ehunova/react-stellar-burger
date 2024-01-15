import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import {useDispatch, useSelector} from "react-redux";
import {GET_INGREDIENTS} from "../../services/constants/constants";

function App() {
    const dispatch = useDispatch();

    const getIngredientsList = () => {
        fetch(`https://norma.nomoreparties.space/api/ingredients`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка: ${response.status}`);
            })
            .then(data => dispatch({type: GET_INGREDIENTS, payload: data.data}))
            .catch(console.error);
    }

    React.useEffect(() => {
        getIngredientsList();
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Main/>
        </div>
    );
}

export default App;