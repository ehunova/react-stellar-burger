import React from "react";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {useNavigate, useParams} from "react-router-dom";
import IngredientInfo from "../ingredient-info/ingredient-info";
import Modal from "../modal/modal";
import {TIngredient, useAppSelector} from "../../utils/types";

export default function ModalIngredient() {
    const ingredients: TIngredient[] = useAppSelector(ingredientsListSelector);
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const ingredient = ingredients.find(ingredient => ingredient._id === id);

    return (
        <>
            {
                ingredient && (
                    <Modal title={"Детали ингредиента"} onClose={() => navigate("/")}>
                        <IngredientInfo ingredient={ingredient}/>
                    </Modal>
                )
            }
        </>
    )
}