import {baseUrl} from "../../../src/services/constants/constants";

describe("Main page",  () => {
    beforeEach("Setting viewport and loading ingredient", () => {
        cy.viewport(1920, 1280);
        cy.intercept("GET", `${baseUrl}/ingredients`, {fixture: "ingredients.json"});
        cy.intercept("POST", `${baseUrl}/auth/login`, {fixture: "login.json"});
        cy.intercept("POST", `${baseUrl}/orders`, {fixture: "create-order.json"});
        cy.visit("http://localhost:3000");
    });

    it("Should be available on localhost:3000", () => {
        cy.contains("Соберите бургер");
    })

    it("Should correct work modal Ingredient-info after click on ingredient and close button", () => {
        cy.get("[class^=ingredient_container__]").first().click();
        cy.get("[class^=modal_container__]").should("exist");
        cy.contains("Детали ингредиента");
        cy.contains("Краторная булка N-200i");
        cy.get("[class^=modal_button__]").first().click();
        cy.get("[class^=modal_container__]").should("not.exist");
    })

    it("Should DnD install ingredients and create order with authorized user", () => {
        cy.get("[class^=burger-constructor_container]").contains("Краторная булка").should("not.exist");
        cy.get("[class^=burger-constructor_container]").contains("Флюоресцентная булка").should("not.exist");

        cy.get("[class^=ingredient_container__]").contains("Соус традиционный галактический").trigger("dragstart");
        cy.get("[class^=burger-constructor_container]").trigger("drop");
        cy.get("[class^=burger-constructor_container]").contains("Соус традиционный галактический").should("exist");

        cy.get("[class^=ingredient_container__]").contains("Биокотлета из марсианской Магнолии").trigger("dragstart");
        cy.get("[class^=burger-constructor_container]").trigger("drop");
        cy.get("[class^=burger-constructor_container]").contains("Биокотлета из марсианской Магнолии").should("exist");

        cy.get("[class^=button]").contains("Оформить заказ").should("be.disabled");

        cy.get("[class^=ingredient_container__]").first().trigger("dragstart");
        cy.get("[class^=burger-constructor_container]").trigger("drop");
        cy.get("[class^=burger-constructor_container]").contains("Краторная булка").should("exist");

        cy.get("[class^=button]").contains("Оформить заказ").click();
        cy.contains("Вход");

        cy.get("input[type=email]").type("test@yandex.ru");
        cy.get("input[type=password]").type("testtest123");

        cy.get("button[type=submit]").contains("Войти").click();
        cy.contains("Вход").should("not.exist");

        cy.get("[class^=button]").contains("Оформить заказ").click();
        cy.get("[class^=modal_container__]").should("exist");
        cy.contains("34758");
        cy.contains("Ваш заказ начали готовить");
        cy.get("[class^=modal_button__]").first().click();
        cy.get("[class^=modal_container__]").should("not.exist");

        cy.get("[class^=burger-constructor_container]").contains("Краторная булка").should("not.exist");
        cy.get("[class^=burger-constructor_container]").contains("Флюоресцентная булка").should("not.exist");
    })
});
