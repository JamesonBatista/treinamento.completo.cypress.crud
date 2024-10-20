import { faker, clone, crudStorage } from "../support/e2e";
describe("Camadas JSON", () => {
  it("test 1", () => {
    cy.crud({
      post: "localhost/login",
      body: {
        username: "admin",
        password: "password",
      },
      expect: "token",
    });

    cy.crud({
      post: "localhost/login-hard",
      body: {
        username: "admin",
        password: "password",
      },
      expect: "token",
    });
  });

  it("test convencinal", () => {
    cy.api({
      method: "POST",
      url: "http://localhost:3000/login-hard",
      headers: { "Content-type": "application/json" },
      body: {
        username: "admin",
        password: "password",
      },
    }).then((response) => {
      let body = response.body;
      for (let iteration of body.data) {
        for (let form_iteration of iteration.form) {
          body = form_iteration;
        }
      }
      cy.log(JSON.stringify(body));
    });
  });
});
