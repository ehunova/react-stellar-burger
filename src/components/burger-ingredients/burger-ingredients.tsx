import React, {RefObject, useRef, useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import Ingredient from "../ingredient/ingredient";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {TIngredient, useAppSelector} from "../../utils/types";

export default function BurgerIngredients() {
    const ingredients: TIngredient[] = useAppSelector(ingredientsListSelector);
    const [current, setCurrent] = useState<string>("bun");

    const tabRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const scrollListener = (): void => {
        if (tabRef.current === null || bunRef.current === null || sauceRef.current === null || mainRef.current === null) {
            return;
        }
        const bunPosition = Math.abs(tabRef.current.getBoundingClientRect().top -
            bunRef.current.getBoundingClientRect().top);

        const saucePosition = Math.abs(tabRef.current.getBoundingClientRect().top -
            sauceRef.current.getBoundingClientRect().top);

        const mainPosition = Math.abs(tabRef.current.getBoundingClientRect().top -
            mainRef.current.getBoundingClientRect().top);

        const closestPosition = Math.min(bunPosition, saucePosition, mainPosition);

        setCurrent(bunPosition === closestPosition ? "bun" : saucePosition === closestPosition ? "sauce" : "main")
    }

    const scrollToRef = (ref: RefObject<HTMLHeadingElement>, refValue: string): void => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrent(refValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.tab} ref={tabRef}>
                <Tab value="bun" active={current === "bun"} onClick={() => scrollToRef(bunRef, "bun")}>Булки</Tab>
                <Tab value="sauce" active={current === "sauce"} onClick={() => scrollToRef(sauceRef, "sauce")}>Соусы</Tab>
                <Tab value="main" active={current === "main"} onClick={() => scrollToRef(mainRef, "main")}>Начинки</Tab>
            </div>
            <div className={clsx(styles.category, "mt-10")} onScroll={scrollListener}>
                <h2 className={clsx("text text_type_main-medium")} ref={bunRef}>Булки</h2>
                <div className={clsx(styles.ingredients, "mt-6 ml-4")}>
                    {
                        ingredients.map(ingredient => {
                            if (ingredient.type === "bun") {
                                return (
                                    <Ingredient key={ingredient._id} ingredient={ingredient}/>
                                )
                            }
                        })
                    }
                </div>
                <h2 className={clsx("text text_type_main-medium mt-10")} ref={sauceRef}>Соусы</h2>
                <div className={clsx(styles.ingredients, "mt-6 ml-4")}>
                    {
                        ingredients.map(ingredient => {
                            if (ingredient.type === "sauce") {
                                return (
                                    <Ingredient key={ingredient._id} ingredient={ingredient}/>
                                )
                            }
                        })
                    }
                </div>
                <h2 className={clsx("text text_type_main-medium mt-10")} ref={mainRef}>Начинки</h2>
                <div className={clsx(styles.ingredients, "mt-6 ml-4")}>
                    {
                        ingredients.map(ingredient => {
                            if (ingredient.type === "main") {
                                return (
                                    <Ingredient key={ingredient._id} ingredient={ingredient}/>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}