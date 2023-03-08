describe('Page load test', () => {
  it('should load the page with an HTML tag', () => {
    cy.visit('http://localhost:3000')
    cy.get('html').should('exist')
  })
})
