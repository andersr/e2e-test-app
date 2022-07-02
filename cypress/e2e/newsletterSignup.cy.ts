describe("Newsletter signup", () => {
  // ** 1 **
  beforeEach(() => {
    // ** 2 **
    cy.visit("/newsletter");
  });

  it("displays a message explaining the form's purpose", () => {
    cy.get('[data-test="newsletter"]').contains("Sign up for our newsletter");
  }); // ** 3 **

  it("allows for completing a newsletter signup", () => {
    const testEmail = "test@email.com";

    cy.intercept("POST", "/api/newsletter", (req) => {
      // ** 1 **

      expect(req.body.email).to.contain(testEmail); // ** 2 **

      req.reply({
        // ** 3 **
        statusCode: 200,
        body: {
          success: true,
          message: "Success message",
        },
      });
    });

    cy.get('[data-test="emailInput"]').type(testEmail); // ** 4 **
    cy.get('[data-test="formSubmit"]').click(); // ** 5 **
    cy.get('[data-test="successMessage"]').should("exist"); // ** 6 **
  });

  it("allows for submitting the form by using the enter key");

  it("displays an error message if input value is not a valid email address");

  it("displays an error message if the input field is empty");

  it("clears the email input if signup is successful");

  it("persists the email input value if there is an error");
});
