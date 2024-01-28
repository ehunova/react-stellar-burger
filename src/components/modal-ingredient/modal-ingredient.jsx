import React from "react";
import {useSelector} from "react-redux";
import {ingredientsListSelector} from "../../services/actions/actionsSelector";
import {useNavigate, useParams} from "react-router-dom";
import IngredientInfo from "../ingredient-info/ingredient-info";
import Modal from "../modal/modal";

export default function ModalIngredient() {
    const ingredients = useSelector(ingredientsListSelector);
    const {id} = useParams();
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