import {baseUrl} from "../../../src/services/constants/constants";

describe("Main page",  () => {
    beforeEach("Setting viewport and loading ingredient", () => {
        cy.viewport(1920, 1280);
        cy.intercept("GET", `${baseUrl}/ingredients`, {fixture: "ingredients.json"});
        cy.intercept("POST", `${baseUrl}/auth/login`, {fixture: "login.json"});
        cy.intercept("POST", `${baseUrl}/orders`, {fixture: "create-order.json"});
        cy.visit("/");
    });

    it("Should be available on localhost:3000", () => {
        cy.contains("Соберите бургер");
    })

    it("Should correct work modal Ingredient-info after click on ingredient and close button", () => {
        cy.get("[class^=ingredient_container__]").as("ingredient");
        cy.get("@ingredient").first().click();
        cy.get("[class^=modal_container__]").as("modal");
        cy.get("@modal").should("exist");
        cy.contains("Детали ингредиента");
        cy.contains("Краторная булка N-200i");
        cy.get("[class^=modal_button__]").as("closeModalButton");
        cy.get("@closeModalButton").first().click();
        cy.get("@modal").should("not.exist");
    })

    it("Should DnD install ingredients and create order with authorized user", () => {
        cy.get("[class^=burger-constructor_container]").as("constructorContainer");
        cy.get("@constructorContainer").contains("Краторная булка").should("not.exist");
        cy.get("@constructorContainer").contains("Флюоресцентная булка").should("not.exist");

        cy.get("[class^=ingredient_container__]").as("ingredient");
        cy.get("@ingredient").contains("Соус традиционный галактический").trigger("dragstart");
        cy.get("@constructorContainer").trigger("drop");
        cy.get("@constructorContainer").contains("Соус традиционный галактический").should("exist");

        cy.get("@ingredient").contains("Биокотлета из марсианской Магнолии").trigger("dragstart");
        cy.get("@constructorContainer").trigger("drop");
        cy.get("@constructorContainer").contains("Биокотлета из марсианской Магнолии").should("exist");

        cy.get("[class^=button]").as("createOrderButton");
        cy.get("@createOrderButton").contains("Оформить заказ").should("be.disabled");

        cy.get("@ingredient").first().trigger("dragstart");
        cy.get("@constructorContainer").trigger("drop");
        cy.get("@constructorContainer").contains("Краторная булка").should("exist");

        cy.get("@createOrderButton").contains("Оформить заказ").click();
        cy.contains("Вход");

        cy.get("input[type=email]").type("test@yandex.ru");
        cy.get("input[type=password]").type("testtest123");

        cy.get("button[type=submit]").contains("Войти").click();
        cy.contains("Вход").should("not.exist");

        cy.get("@createOrderButton").contains("Оформить заказ").click();
        cy.get("[class^=modal_container__]").as("modal");
        cy.get("@modal").should("exist");
        cy.contains("34758");
        cy.contains("Ваш заказ начали готовить");
        cy.get("[class^=modal_button__]").as("closeModalButton");
        cy.get("@closeModalButton").first().click();
        cy.get("@modal").should("not.exist");

        cy.get("@constructorContainer").contains("Краторная булка").should("not.exist");
        cy.get("@constructorContainer").contains("Флюоресцентная булка").should("not.exist");
    })
});
