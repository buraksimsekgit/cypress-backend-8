class BackendPage {
  /* Locators */
  getFirstName() {
    return cy.get('[name="firstName"]');
  }

  getLastName() {
    return cy.get('[name="lastName"]');
  }

  getEmail() {
    return cy.get('[name="email"]');
  }

  getDOB() {
    return cy.get('[name="dob"]');
  }

  getAddButton() {
    return cy.get('[type="submit"]');
  }

  getUserList() {
    return cy.get(".common_listContainer__cvSer");
  }

  getUserSarchBar() {
    return cy.get('common_undernav__spCsm [type="text"]');
  }

  getModal() {
    return cy.get("#mymodal");
  }

  getModalEmail() {
    return this.getModal().find('[name="email"]');
  }

  getModalUpdateButton() {
    return this.getModal().find('[type="submit"]');
  }

  getDeleteAllButton() {
    return cy.get(".common_undernav__spCsm > button");
  }

  getSpecificUser(user) {
    return this.getUserList().contains(user);
  }

  getSpecificUserEmail(user, email) {
    return this.getSpecificUser(user).next().contains(email);
  }

  /* Methods */

  createUser(firstName, lastName, email, dob) {
    this.getFirstName().type(firstName);
    this.getLastName().type(lastName);
    this.getEmail().type(email);
    this.getDOB().type(dob);
    this.getAddButton().click();
  }

  getUserEditButton(user) {
    return this.getUserList()
      .contains(".common_list__UR80V", user)
      .contains("EDIT")
      .click();
  }

  getUserDeleteButton(user) {
    return this.getUserList()
      .contains(".common_list__UR80V", user)
      .contains("DELETE")
      .click();
  }
}

module.exports = BackendPage;
