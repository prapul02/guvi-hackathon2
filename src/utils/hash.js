const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = (plainText) => {
  console.log(plainText);
  const hashedValue = bcrypt.hashSync(plainText, saltRounds);
  return hashedValue;
};

exports.compareHash = (plainText, existingHash) => {
  const result = bcrypt.compareSync(plainText, existingHash);
  return result;
};

// const hashedPassword = hash("Hello");
// const compareResult = compareHash("Hello", hashedPassword);

// console.log(compareResult);