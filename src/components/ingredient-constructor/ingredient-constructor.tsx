import React from "react";
import styles from "./ingredient-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import clsx from "clsx";
import {burgerConstructorSelector} from "../../services/actions/actionsSelector";
import {moveFillingElement} from "../../services/reducers/burger-constructor-slice";
import {TIngredient, TIngredientConstructor, useAppDispatch, useAppSelector} from "../../utils/types";

type TCollectedProps = { isDrag: boolean; };
type TIngredientConstructorProps = {
    ingredient: TIngredient;
    handleRemove: () => void;
    index: number;
}

export default function IngredientConstructor({ingredient, handleRemove, index}: TIngredientConstructorProps) {
    const burgerConstructor: TIngredientConstructor = useAppSelector(burgerConstructorSelector);
    const dispatch = useAppDispatch();

    const [{isDrag}, dragRef] = useDrag<TIngredient, unknown, TCollectedProps>({
        type: 'sort',
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop<TIngredient, unknown, unknown>({
        accept: 'sort',
        hover(dragIngredient) {
            if (dragIngredient.uuid === ingredient.uuid) return
            dispatch(moveFillingElement({
                indexFrom: burgerConstructor.filling.indexOf(dragIngredient),
                indexTo: index,
                ingredient: dragIngredient,
            }))
        }
    })

    return (
        <div className={clsx(styles.container, isDrag ? styles.dragging : '')} ref={element => dragRef(dropRef(element))}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price}
                handleClose={handleRemove}
            />
        </div>
    )
}