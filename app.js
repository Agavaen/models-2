const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


let users = [];


app.get("/users", (req, res) => {
  res.render("users");
});


app.post("/users", (req, res) => {

  const { name, age, email } = req.body;

  let errors = [];


  if (!name) errors.push("Имя обязательно");
  if (!age || age < 1 || age > 120) errors.push("Возраст некорректный");
  if (!email || !email.includes("@")) errors.push("Email неверный");

 
  if (errors.length > 0) {
    return res.render("result", {
      success: false,
      errors: errors
    });
  }


  const newUser = { name, age, email };
  users.push(newUser);


  res.render("result", {
    success: true,
    user: newUser
  });

});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});