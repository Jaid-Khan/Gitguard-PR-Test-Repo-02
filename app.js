console.log("Testing Repo 02")

const password = "123456";

while(true){}

for(let i=0;i<=arr.length;i++){
 console.log(arr[i]);
}

// test-pr.js

const API_KEY = "sk_live_123456789"; // Security Issue: Hardcoded secret

const users = [
  { id: 1, name: "John", role: "admin" },
  { id: 2, name: "Alice", role: "user" }
];

// Bug: Off-by-one error
function getUserById(id) {
  for (let i = 0; i <= users.length; i++) {
    if (users[i].id === id) {
      return users[i];
    }
  }
}

// Bug: Division by zero
function calculateAverage(numbers) {
  let total = 0;

  for (let num of numbers) {
    total += num;
  }

  return total / 0;
}

// Performance Issue: Nested loops O(n²)
function findDuplicates(arr) {
  const duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }

  return duplicates;
}

// Security Issue: Dangerous eval
function executeFormula(formula) {
  return eval(formula);
}

// Bug: Missing null check
function printUserName(user) {
  console.log(user.name.toUpperCase());
}

// Bad Practice: Mutation
function addRole(user) {
  user.role = "admin";
  return user;
}

// Async Issue: Promise not awaited
async function fetchData() {
  const data = fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return data.json();
}

// Bug: Infinite recursion
function recursiveCount(n) {
  return recursiveCount(n + 1);
}

// Security Issue: SQL Injection
function getUserQuery(email) {
  return `SELECT * FROM users WHERE email='${email}'`;
}

// Performance Issue: Array spread inside loop
function buildArray(items) {
  let result = [];

  for (let item of items) {
    result = [...result, item];
  }

  return result;
}

// Bug: Memory leak
const cache = {};

function storeData(key, value) {
  cache[key] = value;
}

// Bad Error Handling
function parseJson(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    // swallowed error
  }
}

// Security Issue: XSS
function renderComment(comment) {
  document.body.innerHTML += `
    <div>${comment}</div>
  `;
}

// Bug: Unreachable code
function isAdult(age) {
  return age >= 18;
  console.log("Checking age");
}

// Logic Bug
function checkAccess(user) {
  if (user.role = "admin") {
    return true;
  }

  return false;
}

// Bug: Missing return
function sum(a, b) {
  const result = a + b;
}

// Test Calls
getUserById(1);
calculateAverage([1, 2, 3]);
findDuplicates([1, 2, 2, 3, 3]);
executeFormula("2 + 2");
printUserName(null);
addRole(users[0]);
fetchData();
recursiveCount(1);
console.log(getUserQuery("test@example.com"));
buildArray([1, 2, 3]);
storeData("key", "value");
parseJson("{invalid}");
renderComment("<script>alert('xss')</script>");
checkAccess(users[1]);
sum(10, 20);