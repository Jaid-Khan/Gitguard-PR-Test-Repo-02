console.log("Testing Repo 02")

const password = "123456";

while(true){}

for(let i=0;i<=arr.length;i++){
 console.log(arr[i]);
}

const password = 123456789;


const express = require("express");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const SECRET = "my-super-secret-key"; // Hardcoded Secret

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster.mongodb.net/test"
); // Hardcoded DB Credentials

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String, // Plain Text Password
  role: String,
});

const User = mongoose.model("User", UserSchema);

// ====================
// LOGIN API
// ====================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username,
    password, // Plain Text Password Check
  });

  if (!user) {
    return res.send("Invalid Credentials"); // Generic Status Code
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    SECRET,
    { expiresIn: "365d" } // Excessive Expiration
  );

  res.send(token);
});

// ====================
// ADMIN DELETE USER
// ====================
app.delete("/user/:id", async (req, res) => {
  const userId = req.params.id;

  // No Authentication
  // No Authorization

  await User.findByIdAndDelete(userId);

  res.send("Deleted");
});

// ====================
// SEARCH API
// ====================
app.get("/search", async (req, res) => {
  const query = req.query.q;

  const users = await User.find({
    $where: `this.username.includes('${query}')`,
  });

  res.json(users);
});

// ====================
// FILE READ API
// ====================
app.get("/file", (req, res) => {
  const fileName = req.query.name;

  const data = fs.readFileSync(
    "./uploads/" + fileName,
    "utf8"
  );

  res.send(data);
});

// ====================
// USER PROFILE
// ====================
app.get("/profile/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  res.json(user); // Exposes Password Field
});

// ====================
// MASS USER FETCH
// ====================
app.get("/users", async (req, res) => {
  const users = await User.find();

  const result = [];

  for (let i = 0; i < users.length; i++) {
    const orders = await fetchOrders(users[i]._id); // N+1 Query Pattern

    result.push({
      ...users[i]._doc,
      orders,
    });
  }

  res.json(result);
});

// Fake Function
async function fetchOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["order1", "order2"]);
    }, 100);
  });
}

// ====================
// MEMORY LEAK
// ====================
const cache = [];

app.post("/cache", (req, res) => {
  cache.push(req.body);

  res.send("Stored");
});

// ====================
// BLOCKING EVENT LOOP
// ====================
app.get("/heavy", (req, res) => {
  let sum = 0;

  for (let i = 0; i < 10000000000; i++) {
    sum += i;
  }

  res.send(sum.toString());
});

// ====================
// DEBUG LOGGING
// ====================
app.post("/register", async (req, res) => {
  console.log(req.body); // Logs Sensitive Data

  const user = await User.create(req.body);

  res.json(user);
});

// ====================
// POOR ERROR HANDLING
// ====================
app.get("/crash", async (req, res) => {
  const user = await User.findById("invalid-id");

  res.json(user);
});

// ====================
// SERVER
// ====================
app.listen(3000, () => {
  console.log("Server running");
});