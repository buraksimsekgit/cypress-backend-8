import { postRequestBody, putRequestBody } from "../../fixtures/testData.json";

describe("CRUD Operations", () => {
  // Temporary request to clean start.
//   after(() => {
//     cy.request({
//       method: "DELETE",
//       url: "https://tech-global-training.com/students/deleteAll",
//     });
//   });

  let studentId;

  it("Create a new student using POST", () => {
    cy.request({
      method: "POST",
      url: Cypress.env("baseUrl"),
      body: postRequestBody,
    }).then((response) => {
      // This is just a proof that we get the response of what we created.
      console.log(JSON.stringify(response.body, null, 2));

      expect(response.status).to.equal(200);
      // expect(response.body.firstName).to.equal(postRequestBody.firstName)
      expect(response.duration).to.be.below(400);

      // Example of Array Destructuring
      const numbers = [1, 2, 3];
      const [first, second] = numbers;
      console.log(first); // Outputs: 1
      console.log(second); // Outputs: 2

      cy.log(response.body["firstName"] + " " + response.body.firstName);

      studentId = response.body.id;

      // ["firstName", "Kristian"]
      // Object.entries(postRequestBody).forEach(([key ,value]) => {
      //     expect(response.body[key]).to.equal(value)

      //     cy.log(response.body[key] + ' value of ' + key)
      //     cy.log(value + ' coming from the request')
      // })

      cy.validateResponse(response, postRequestBody);
    });
  });

  /**
   * Get the user you created
   * And validate your status is 200
   */

  it("Read the created student using GET", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("baseUrl")}/${studentId}`,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  /**
   * Create a PUT request
   * Update the student that we created
   * and validate the status code is 200
   * and validate your updated request is matching with the response of your PUT request
   */

  it("Update the created student using PUT", () => {

    cy.request({
        method: "PUT",
        url: `${Cypress.env("baseUrl")}/${studentId}`,
        body: putRequestBody,
      }).then((response) => {
        console.log(JSON.stringify(response.body, null, 2));
        expect(response.status).to.equal(200);
        cy.validateResponse(response, putRequestBody);
      })
  });

  /**
   * Send a request and GET the updated user
   * Validate its 200
   * Validate response time is under 400ms
   * and validate student firstname on the response is matching with your updated name
   */

  it("Get the updated student using GET", () => {

    cy.request({
        method: "GET",
        url: `${Cypress.env("baseUrl")}/${studentId}`,
      }).then((response) => {

        expect(response.status).to.equal(200);
        expect(response.duration).to.be.lessThan(400)

        expect(response.body.firstName).to.equal(putRequestBody.firstName)
      });
  });

  it("Delete the the student using DELETE", () => {

    cy.request({
        method: "DELETE",
        url: `${Cypress.env("baseUrl")}/${studentId}`,
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
  });
});
