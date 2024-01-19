import React from "react";
import styles from "./ingredient-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag, useDrop} from "react-dnd";
import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";
import {burgerConstructorSelector} from "../../services/actions/actionsSelector";
import {moveFillingElement} from "../../services/reducers/burger-constructor-slice";

export default function IngredientConstructor({ingredient, handleRemove, index}) {
    const burgerConstructor = useSelector(burgerConstructorSelector);
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

IngredientConstructor.propTypes = {
    ingredient: PropTypes.object,
    handleRemove: PropTypes.func,
    index: PropTypes.number,
};