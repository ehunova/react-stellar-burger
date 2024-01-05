import React from "react";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import styles from "./main.module.css";
import clsx from "clsx";

export default function Main() {
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
    }

    React.useEffect(() => {
        getIngredientsList();
    }, [])

    return (
        <main className={styles.container}>
            <section className={clsx(styles.ingredients, "mr-10")}>
                <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
                <BurgerIngredients ingredients={ingredients}/>
            </section>
            <BurgerConstructor ingredients={ingredients}/>
        </main>
    )
}



