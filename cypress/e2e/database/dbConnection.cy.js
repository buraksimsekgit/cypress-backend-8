const BackendPage = require('../../pages/BackendPage')

describe('DBConnection', () => {

  const backendPage = new BackendPage()

  before(function() {
    cy.visit('backend')

    backendPage.getDeleteAllButton().click()
  })

  beforeEach(function() {
    cy.visit('backend')
    cy.fixture('user').then(function(data) {
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.email = data.email
      this.dob = data.dob
      this.updatedEmail = data.updatedEmail
    })
  })

  it('runs a query', () => {

    cy.task('runQuery', 'SELECT * FROM student').then((rows) => {
      expect(rows).to.have.length(2)

      // cy.wrap(rows).should('have.length', 2)

      // console.log(JSON.stringify(rows, null, 2))
    })
  })

  /**
   * Test Case 1
   * 
   * 1. Visit "https://techglobal-training.com/backend"
   * 2. Create a valid user
   * 3. Run a query to validate that the user was created
   */

  it('Test Case 1 - Create user and validate', function() {

    backendPage.createUser(this.firstName, this.lastName, this.email, this.dob)

    cy.task('runQuery', `SELECT * FROM student WHERE email = '${this.email}'`).then((rows) => {
      expect(rows).to.have.length(1)

      const user = rows[0]

      cy.log(JSON.stringify(user, null, 2))

      console.log(Object.keys(user))
      console.log(user)

      // expect(user[3]).to.equal('Tech')
      // expect(user[4]).to.equal('Global')
      // expect(user[1]).to.equal('1990-01-01')
      // expect(user[2]).to.equal('tech@tech.com')

      const expectedValues = [this.dob, this.email, this.firstName, this.lastName]

      expectedValues.forEach((value, index) => {
        expect(user[index + 1]).to.equal(value)
      })
    })
  })

  /**
   * Test Case 2
   * 1. Visit "https://techglobal-training.com/backend"
   * 2. Update a valid user
   * 3. Run a query to validate that the user was updated
   */

  it('Test Case 2 - Update user and validate in database', function() {

    backendPage.getUserEditButton(this.firstName)
    backendPage.getModalEmail().clear().type(this.updatedEmail)
    backendPage.getModalUpdateButton().click()
    backendPage.getModal().should('not.exist')

    cy.task('runQuery', `SELECT * FROM student WHERE email = '${this.updatedEmail}'`).then((rows) => {
      expect(rows).to.have.length(1)

      const user = rows[0]

      cy.log(JSON.stringify(user, null, 2))

      console.log(Object.keys(user))
      console.log(user)

      const expectedValues = [this.dob, this.updatedEmail, this.firstName, this.lastName]

      expectedValues.forEach((value, index) => {
        expect(user[index + 1]).to.equal(value)
      })
    })
  })

    /**
   * Test Case 3
   * 1. Visit "https://techglobal-training.com/backend"
   * 2. Delete the user you created
   * 3. Run a query to validate that the user was deleted
   */

    it('Test Case 3 - Delete user and validate', function() {

      backendPage.getUserDeleteButton(this.updatedEmail)

      cy.task('runQuery', `SELECT * FROM student WHERE email = '${this.updatedEmail}'`).then((rows) => {
        expect(rows).to.have.length(0)
      })
    })
})