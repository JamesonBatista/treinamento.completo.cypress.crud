import { faker, clone, crudStorage } from "../support/e2e";
describe("Complete crud", () => {
  it("Crud API users", () => {
    cy.crud("crud_users/crud");
  });
});
