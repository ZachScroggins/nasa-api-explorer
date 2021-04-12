describe('The App', () => {
  it('goes to all nav links', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Explore NASA Imagery and Data');

    cy.contains('Home').should('have.class', 'bg-gray-200');

    cy.contains('About the APIs').click();

    cy.url().should('include', '/about');

    cy.get('h1').should('contain', 'About');

    cy.contains('About the APIs').should('have.class', 'bg-gray-200');

    cy.contains('Image Library').click();

    cy.url().should('include', '/images');

    cy.contains('Kepler Beyond');

    cy.contains('Image Library').should('have.class', 'bg-gray-200');

    cy.contains('Earth Polychromatic').click();

    cy.wait(5000);

    cy.get('[data-cy=success]');

    cy.get('img');

    cy.contains('Earth Polychromatic').should('have.class', 'bg-gray-200');

    cy.contains('Home').click();

    cy.get('h1').should('contain', 'Explore NASA Imagery and Data');

    cy.contains('Home').should('have.class', 'bg-gray-200');

    cy.contains('Astronomy Picture of the Day').click();

    cy.url().should('include', '/apod');

    cy.get('img');

    cy.contains('Astronomy Picture of the Day').should(
      'have.class',
      'bg-gray-200'
    );

    cy.contains('NASA API Explorer').click();

    cy.get('h1').should('contain', 'Explore NASA Imagery and Data');

    cy.contains('Home').should('have.class', 'bg-gray-200');
  });
});

export {};
