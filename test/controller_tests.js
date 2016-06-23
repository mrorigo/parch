"use strict";

import { expect } from "chai";

import Controller from "../src/controller";
import ModelManager from "../src/model_manager";
import UserModel from "./fixtures/models/user_model";
import { loader, modelManager } from "./fixtures";

describe("Controller", function () {
  let controller;

  it("has a name", function () {
    class UserController extends Controller {
      constructor(settings) {
        super(settings);
      }
    }

    const controller = new UserController({ loader });
    expect(controller.name).to.eql("user");
  });

  it("has a corresponding model", function () {
    class UserController extends Controller {
      constructor(settings) {
        super(settings);
      }
    }

    const controller = new UserController({ loader });
    expect(controller.model.name).to.eql("User");
  });

  it("overrides model when provided", function () {
    class UserController extends Controller {
      constructor(settings) {
        super(settings);
      }
    }

    const controller = new UserController({ loader, model: "foo" });
    expect(controller.model.name).to.eql("Foo");
  });

  describe.only("finders", function () {
    let controller;

    beforeEach(function () {
      class UserController extends Controller {
        constructor(settings) {
          super(settings);
        }
      }
      controller = new UserController({ loader });
      return modelManager.sequelize.sync({ force: true });
    });

    describe("#findAll", function () {
      it("returns all records of a model", function () {
        return controller.findAll().then(users => {
          expect(users).to.eql([]);

          return modelManager.models.User.create({ firstName: "john" });
        }).then(() => controller.findAll())
        .then(users => {
          expect(users[0].firstName).to.eql("john");
        });
      });

      it("allows for querying");
    });

    describe("#findOne", function () {
      it("finds a single record by id", function () {
        return modelManager.models.User.create({ firstName: "john" })
          .then(john => controller.findOne(john.id))
          .then(john => {
            expect(john.firstName).to.eql("john");
          })
      });

      it("throws NotFoundError if no record is found", function (done) {
        controller.findOne(1).catch(err => {
          expect(err.code).to.eql("NotFound");
          expect(err.message).to.eql("User with id '1' does not exist");
          done();
        })
      });
    });

    describe("#createRecord", function () {
      it("creates a new record");

      it("throws BadRequestError for invalid body");

      it("throws UnprocessableEntityError for validation failures");
    });

    describe("#updateRecord", function () {
      it("updates an existing record by id");

      it("throws NotFoundError if record is not found");

      it("throws UnprocessableEntityError for validation failures");
    });
  });
});
