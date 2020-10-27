// https://docs.cypress.io/api/introduction/api.html
import { locations, characters } from '../../test-data'

describe('User journey', () => {
  it('Renders all locations at the root url', () => {
    cy.visit('/')
    cy.get('.location-list li').should('have.length', locations.length)
    cy.get('.character-list').should('contain.text', 'Select a location to view its residents')
  })

  it('Renders the residents in the same page when a location is clicked', () => {
    cy.visit('/')
    cy.get('.location-list li:nth-child(2)').click()
    cy.get('.character-list li').should('have.length', 1)
    cy.get('.location-list li:nth-child(12)').click()
    cy.get('.character-list').should('contain.text', 'There are no residents in the selected location')
  })

  it('Opens resident details in a new page', () => {
    const residentUrl = locations[1].residents[0]
    const residentUrlChunks = residentUrl.split('/')
    const residentId = residentUrlChunks[residentUrlChunks.length - 1]

    cy.visit('/')
    cy.get('.location-list li:nth-child(2)').click()
    cy.get('.character-list li:first-child').click()
    cy.url().should('contain', `character/${residentId}`)
    cy.get('#app').should('contain.text', characters[residentId - 1].name)
  })
})
