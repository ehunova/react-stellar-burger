export const ingredientsListSelector = store => store.ingredientsList.ingredients;
export const viewingIngredientSelector = store => store.viewingIngredient.details;
export const burgerConstructorSelector = store => store.burgerConstructor;
export const orderSelector = store => store.order;
export const orderTotalSelector = store =>
    (
        store.burgerConstructor.bun !== null
        ? store.burgerConstructor.bun.price * 2
        : 0
    )
    + store.burgerConstructor.filling.reduce((sum, ingredient) => sum + ingredient.price, 0);

export const isAuthCheckedSelector = store => store.auth.isAuthChecked;
export const userSelector = store => store.auth.user;
