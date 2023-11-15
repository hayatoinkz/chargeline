/// <reference types="cypress" />

import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789qwertyuiopasdfghjklzxcvbnm', 10);

describe('Login', () => {
  let email: string;
  let password: string;

  beforeEach(() => {
    email = `test${nanoid()}@example.com`;
    password = nanoid();

    cy.createNewUser({
      email,
      password,
      firstName: `FirstName${nanoid()}`,
      lastName: `LastName${nanoid()}`,
    });
    cy.get('[data-testid="profile-menu-item"]').click();
    cy.get('[data-testid="logout-menu-item"]').click();
    cy.get('[data-testid="profile-menu-item"]').should('not.exist');
    cy.visit('/auth/login');
  });

  it('Successful Login', () => {
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="sign-in-submit"]').click();
    cy.location('pathname').should('not.include', '/auth/login');
  });

  it('Successful Login with redirect', () => {
    cy.visit('/home');
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
    cy.get('[data-testid="sign-in-submit"]').click();
    cy.location('pathname').should('include', '/home');
  });
});
