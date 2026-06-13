const voucher = require("./voucher/voucher.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(voucher);
    // ~cb-add-configure-service-name~
};
