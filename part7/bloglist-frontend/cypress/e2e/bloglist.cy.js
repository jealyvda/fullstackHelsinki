describe("Blog app", () => {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Jealy van den Aker",
      username: "jvda",
      password: "sweety",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      name: "Anonymous",
      username: "jvdaa",
      password: "sweety",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("jvda");
      cy.get("#password").type("sweety");
      cy.get("#login-button").click();

      cy.contains("Jealy van den Aker logged in");
    });

    it("fails with wrong credentails", function () {
      cy.get("#username").type("jvda");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "jvda", password: "sweety" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("Oliver Twist");
      cy.get("#author").type("Charles Dickens");
      cy.get("#url").type("google.com");
      cy.get("#create-blog").click();

      cy.contains("Oliver Twist");
    });

    describe("Several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
        });
        cy.createBlog({
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        });
        cy.createBlog({
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        });
        cy.contains("React patterns").parent().find("#view").click();
        cy.contains("Go To Statement Considered Harmful")
          .parent()
          .find("#view")
          .click();
        cy.contains("Canonical string reduction")
          .parent()
          .find("#view")
          .click();
      });

      it("Users can like a blog", function () {
        cy.get(".blogContent")
          .contains("React patterns")
          .parent()
          .find("#like-button")
          .click();
        cy.get(".blogContent")
          .contains("React patterns")
          .should("contain", "1");
      });

      it("Blog can be deleted by the creator", function () {
        cy.get(".blogContent")
          .contains("React patterns")
          .parent()
          .contains("delete")
          .click();
        cy.get(".blogContent").should("not.contain", "React patterns");
        cy.get(".succes").should("contain", "succesfully deleted");
      });

      it("Blog can not be deleted by another user", function () {
        cy.contains("logout").click();
        cy.login({ username: "jvdaa", password: "sweety" });
        cy.contains("React patterns").parent().contains("view").click();
        cy.should("not.contain", "delete");
      });

      it("Blog with the most likes is displayed first", function () {
        cy.likeBlog("React patterns");
        cy.likeBlog("React patterns");
        cy.get(".blog").eq(0).should("contain", "React patterns");
        cy.get(".blogContent")
          .contains("React patterns")
          .should("contain", "2");

        cy.likeBlog("Go To Statement Considered Harmful");
        cy.likeBlog("Go To Statement Considered Harmful");
        cy.likeBlog("Go To Statement Considered Harmful");
        cy.get(".blog").eq(0).should("contain", "React patterns");
        cy.get(".blogContent")
          .contains("Go To Statement Considered Harmful")
          .should("contain", "3");
      });
    });
  });
});
