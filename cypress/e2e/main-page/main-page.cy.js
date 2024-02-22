describe("service is available",  () => {
    beforeEach("Setting viewport", () => {
        cy.viewport(1920, 1280);
    });

    it("should be available on localhost:3000",  () => {
        cy.visit("http://localhost:3000");
    })
});
