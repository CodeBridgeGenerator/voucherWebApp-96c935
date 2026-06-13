const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("voucher service", async () => {
  let thisService;
  let voucherCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("voucher");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (voucher)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      voucherCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new voucher", () => {
      assert.strictEqual(voucherCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a voucher by ID", async () => {
      const retrieved = await thisService.Model.findById(voucherCreated._id);
      assert.strictEqual(retrieved._id.toString(), voucherCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing voucher ", async () => {
      const voucherUpdated = await thisService.Model.findByIdAndUpdate(
        voucherCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(voucherUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a voucher", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const voucherDeleted = await thisService.Model.findByIdAndDelete(voucherCreated._id);
      assert.strictEqual(voucherDeleted._id.toString(), voucherCreated._id.toString());
    });
  });
});