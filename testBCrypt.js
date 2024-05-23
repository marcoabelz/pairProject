const bcryptjs = require("bcryptjs");

let password = "password1";

const salt = bcryptjs.genSaltSync(10);
const hash = bcryptjs.hashSync(password, salt);
let result = bcryptjs.compareSync("password1", hash);
console.log(hash);
console.log(result);
