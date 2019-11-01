const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://charles:Savanah_1111@cluster0-elzhi.mongodb.net/warbler?retryWrites=true&w=majority", {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require("./user");
module.exports.Link = require("./link");

