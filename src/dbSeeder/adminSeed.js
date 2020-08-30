require("../config/dbConfig");
const Admin = require("../models/admin");
const { hash } = require("../utils/hash");
const faker = require("faker");

const saveAdmin = async () => {
    const newAdmin = new Admin({
      
        email: "admin@gmail.com",
        password: hash("qwerty1234")
    });
  
    try {
      const result = await newAdmin.save();
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

  saveAdmin();

  exports.findByProp = async (emailId) => {
    const result = await Admin.findOne({
      email: emailId
    });
    console.log(result);
    return(result);
  };

