// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//

Cypress.Commands.add('validateResponse', (responseData, expectedData) => {
    /**
     * Object.entries() - method is sued to convert the object into an array of its key-value pairs.
     * 
     * Eg.
     * 
     * {
     *    "firstName": "testName", 
     *    "lastName": "testLastName"
     * }
     * 
     * to
     * 
     * ["firstName", "testName"]
     * ["lastName", "testLastName"]
     */

    cy.log(JSON.stringify(Object.entries(expectedData)), ' ENTRIES RESULT')

    // const arr = [["firstName","Kristian"],["lastName","Lubowitz"],["email","Kristian_Shields@gmail.com"],["dob","2023-12-05"]]

    Object.entries(expectedData).forEach(([key ,value]) => {
        // This print will be result key as "firstName", value as "assignedValue"
        cy.log(`Key: ${key}, Value: ${value}`)

        // Since our responseBody key values should %100 match, responseData.body[key] will return the values of each given keys
        // Snf validat them against the values coming from the expectedData
        expect(responseData.body[key]).to.equal(value)
    })
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })