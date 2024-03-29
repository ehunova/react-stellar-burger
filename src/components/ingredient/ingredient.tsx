import React from "react";
import styles from "./ingredient.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import clsx from "clsx";
import {useDrag} from "react-dnd";
import {burgerConstructorSelector} from "../../services/actions/actionsSelector";
import {Link, Location, useLocation} from "react-router-dom";
import {TFromLocation, TIngredient, TIngredientConstructor, useAppSelector} from "../../utils/types";

type TIngredientProps = {
    ingredient: TIngredient;
}

type TCollectedProps = { isDrag: boolean; };

export default function Ingredient({ingredient}: TIngredientProps) {
    const burgerConstructor: TIngredientConstructor = useAppSelector(burgerConstructorSelector);
    const location: Location<TFromLocation> = useLocation();

    function calculateCount(): number {
        if (ingredient.type !== 'bun') {
            return burgerConstructor.filling.filter(element => element._id === ingredient._id).length;
        } else {
            if (burgerConstructor.bun !== null && ingredient._id === burgerConstructor.bun._id) {
                return 2;
            }
        }
        return 0;
    }

    const count = calculateCount();

    const [{isDrag}, dragRef] = useDrag<TIngredient, unknown, TCollectedProps>({
        type: "ingredient",
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        })
    })

    return (
        <Link className={clsx(styles.container, isDrag ? styles.dragging : '')} ref={dragRef}
              to={`/ingredient/${ingredient._id}`} state={{background: location}}
        >
            <div className={styles.counter}>
                {count !== 0 &&
                    <Counter count={count} size="default"/>
                }
            </div>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={clsx(styles.priceContainer, "mt-1 mb-1")}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
        </Link>
    )
}