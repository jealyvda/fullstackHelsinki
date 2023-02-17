describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Jealy van den Aker',
      username: 'jvda',
      password: 'sweety'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  
  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('jvda')
    cy.get('#password').type('sweety')
    cy.get('#login-button').click()

    cy.contains('Jealy van den Aker logged-in')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('jvda')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')
    cy.get('html').should('not.contain', 'Jealy van den Aker logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jvda', password: 'sweety' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and several notes exist', function() {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})