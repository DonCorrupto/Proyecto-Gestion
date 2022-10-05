
describe("Smoke Test", () => {
  it("Validar index.html", () => {
    cy.visit('web/index.html')
    cy.get('[onclick="btniniciarSesion()"]').should("be.visible")
    cy.get('[onclick="btnCrear()"]').should("be.visible")
  })
}) 

//describe('empty spec', () => {
//  it('passes', () => {
 //   cy.visit('https://example.cypress.io')
 // })
//})