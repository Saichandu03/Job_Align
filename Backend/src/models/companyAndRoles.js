const mongoose = require("mongoose");

const companyAndRolesSchema = new mongoose.Schema({
  company :{
    type : String,
  },
  roles :{
    type : Array
  }
},{
    timestamps: true
}
);

module.exports = mongoose.model('companyAndRolesSchema', companyAndRolesSchema);

