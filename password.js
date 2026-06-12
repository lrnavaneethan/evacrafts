const bcrypt = require("bcryptjs");

bcrypt.hash("YourStrongPassword", 10).then(console.log);