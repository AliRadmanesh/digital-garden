import { getGreeting } from '../support/app.po';

describe('site', () => {
  beforeEach(() => cy.visit('/blog/dynamic-routing'));

  it('should render the title of the post', () => {
    cy.get('h1').should('contain', 'Dynamic Routing and Static Generation');
  });

  it('should properly render the embedded Youtube component', () => {
    cy.get('iframe').should('be.visible');
  });
});
