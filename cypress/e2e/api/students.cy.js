import { postRequestBody } from "../../fixtures/testData.json";

describe("CRUD Operations", () => {

  // Temporary request to clean start.  
  after(() => {
    cy.request({
      method: "DELETE",
      url: 'https://tech-global-training.com/students/deleteAll',
    });
  });

  it("Create a new student using POST", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrl"),
      body: postRequestBody,
    }).then((response) => {

        // This is just a proof that we get the response of what we created.
        console.log(JSON.stringify(response.body, null, 2))

        expect(response.status).to.equal(200)
        // expect(response.body.firstName).to.equal(postRequestBody.firstName)
        expect(response.duration).to.be.below(200)

        // Example of Array Destructuring
        const numbers = [1, 2, 3]
        const[first, second] = numbers
        console.log(first) // Outputs: 1
        console.log(second) // Outputs: 2

        cy.log(response.body['firstName'] + ' ' + response.body.firstName)

        // ["firstName", "Kristian"]
        // Object.entries(postRequestBody).forEach(([key ,value]) => {
        //     expect(response.body[key]).to.equal(value)

        //     cy.log(response.body[key] + ' value of ' + key)
        //     cy.log(value + ' coming from the request')
        // })

        cy.validateResponse(response, postRequestBody)
    })
  });

  /**
   * Get the user you created
   * And validate your status is 200
   */

  it("Read the created student using GET", () => {

  })
});
