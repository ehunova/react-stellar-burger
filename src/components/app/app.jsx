import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";

function App() {
    const [ingredients, setIngredients] = React.useState([]);

    const getIngredientsList = () => {
        fetch(`https://norma.nomoreparties.space/api/ingredients`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Ошибка: ${response.status}`);
            })
            .then(data => setIngredients(data.data))
            .catch(console.error);
    }

    React.useEffect(() => {
        getIngredientsList();
    }, [])

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Main ingredients={ingredients}/>
        </div>
    );
}

export default App;