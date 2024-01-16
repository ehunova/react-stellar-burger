import React from "react";
import styles from "./ingredient-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag, useDrop} from "react-dnd";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {MOVE_FILLING_ELEMENT} from "../../services/constants/constants";

export default function IngredientConstructor({ingredient, handleRemove, index}) {
    const burgerConstructor = useSelector(store => store.burgerConstructor);
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: 'sort',
        item: ingredient,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop({
        accept: 'sort',
        hover(dragIngredient) {
            if (dragIngredient.uuid === ingredient.uuid) return
            dispatch({
                type: MOVE_FILLING_ELEMENT,
                payload: {
                    indexFrom: burgerConstructor.filling.indexOf(dragIngredient),
                    indexTo: index,
                    ingredient: dragIngredient,
                }
            })
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

IngredientConstructor.propTypes = {
    ingredient: PropTypes.object
};