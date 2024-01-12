show();

var user = document.getElementById("user");
var email = document.getElementById("email");
var pass = document.getElementById("pass");
var btn = document.getElementById("btn");
var clearbtn = document.getElementById("clearbtn");
var data = [];

clearbtn.onclick = function () {
  localStorage.removeItem("data");
  location.reload();
};

btn.onclick = function () {
  // Check for missing inputs
  if (!user.value || !email.value || !pass.value) {
    showError("Please fill in all the fields.");
    return;
  }

  // Check for valid email format
  if (!isValidEmail(email.value)) {
    showError("Please enter a valid email address.");
    return;
  }

  // check if local storage full or not
  if (localStorage.getItem("data") != null) {
    // old data >> show it up
    data = JSON.parse(localStorage.getItem("data")); //object
  }
  // dataObj will be pushed in array
  var dataObj = { name: user.value, email: email.value, password: pass.value };
  data.push(dataObj);
  // must be value >> string so convert object to json
  var dataJson = JSON.stringify(data); //json
  localStorage.setItem("data", dataJson);
  show();
  user.value = "";
  email.value = "";
  pass.value = "";
  hideError(); // Clear any previous error messages
};

function show() {
  if (localStorage.getItem("data") == null) {
    data = [];
  } else {
    data = localStorage.getItem("data"); // json
    data = JSON.parse(data); // object
  }

  var res = "";

  for (var i = 0; i < data.length; i++) {
    res += `<tr style = "text-align :center">
                    <td>${data[i].name}</td>
                    <td>${data[i].email}</td>
                    <td>${data[i].password}</td>
                </tr>`;
  }
  document.getElementById("res").innerHTML = res;
}

// Function to check valid email format
function isValidEmail(email) {
  // Simple email validation using a regular expression
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to show error messages
function showError(message) {
  var errorMsg = document.getElementById("errorMsg");
  errorMsg.innerHTML = message;
  errorMsg.style.display = "block";
}

// Function to hide error messages
function hideError() {
  var errorMsg = document.getElementById("errorMsg");
  errorMsg.innerHTML = "";
  errorMsg.style.display = "none";
}
