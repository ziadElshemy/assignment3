// ===== validation.html =====
const form = document.getElementById("regForm");

if (form) {
  // Show or clear an error message under a field
  function setError(id, message) {
    document.getElementById(id + "Error").textContent = message;
    document.getElementById(id).classList.toggle("invalid", message !== "");
  }

  function validate() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const age = document.getElementById("age").value.trim();
    let valid = true;

    // Name
    if (name === "") {
      setError("name", "Name is required.");
      valid = false;
    } else if (name.length < 2) {
      setError("name", "Name must be at least 2 characters.");
      valid = false;
    } else {
      setError("name", "");
    }

    // Email (simple pattern: something@something.something)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setError("email", "Email is required.");
      valid = false;
    } else if (!emailPattern.test(email)) {
      setError("email", "Enter a valid email, like name@example.com.");
      valid = false;
    } else {
      setError("email", "");
    }

    // Password
    if (password === "") {
      setError("password", "Password is required.");
      valid = false;
    } else if (password.length < 8) {
      setError("password", "Password must be at least 8 characters.");
      valid = false;
    } else {
      setError("password", "");
    }

    // Confirm password
    if (confirm === "") {
      setError("confirm", "Please confirm your password.");
      valid = false;
    } else if (confirm !== password) {
      setError("confirm", "Passwords do not match.");
      valid = false;
    } else {
      setError("confirm", "");
    }

    // Age
    const ageNum = Number(age);
    if (age === "") {
      setError("age", "Age is required.");
      valid = false;
    } else if (!Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120) {
      setError("age", "Age must be a whole number between 1 and 120.");
      valid = false;
    } else {
      setError("age", "");
    }

    return valid;
  }

  form.addEventListener("submit", function (event) {
    const success = document.getElementById("success");
    success.textContent = "";

    if (!validate()) {
      event.preventDefault(); // stop the form from being sent
      return;
    }

    // Everything is valid. We prevent the real submit here since there is no server,
    // and just show a confirmation message.
    event.preventDefault();
    success.textContent = "Registration successful!";
  });
}

// ===== data.html =====
if (document.getElementById("tableBody")) {
  // Array of objects
  let people = [
    { name: "Sara",   age: 21, city: "Cairo" },
    { name: "Omar",   age: 25, city: "Giza" },
    { name: "Laila",  age: 19, city: "Alexandria" },
    { name: "Youssef", age: 30, city: "Luxor" },
    { name: "Nour",   age: 23, city: "Cairo" },
    { name: "Karim",  age: 28, city: "Aswan" },
    { name: "Mona",   age: 22, city: "Giza" },
    { name: "Hassan", age: 35, city: "Alexandria" }
  ];

  const tableBody = document.getElementById("tableBody");
  const searchBox = document.getElementById("search");
  const emptyMsg = document.getElementById("empty");

  // Build the table rows with JavaScript
  function renderTable(list) {
    tableBody.innerHTML = "";

    list.forEach(function (person) {
      const row = document.createElement("tr");
      row.innerHTML =
        "<td>" + person.name + "</td>" +
        "<td>" + person.age + "</td>" +
        "<td>" + person.city + "</td>";
      tableBody.appendChild(row);
    });

    emptyMsg.textContent = list.length === 0 ? "No results found." : "";
  }

  // Return only the people that match the search text
  function getFiltered() {
    const text = searchBox.value.toLowerCase().trim();
    return people.filter(function (p) {
      return p.name.toLowerCase().includes(text) ||
             String(p.age).includes(text) ||
             p.city.toLowerCase().includes(text);
    });
  }

  // Filter while the user types (no button needed)
  searchBox.addEventListener("input", function () {
    renderTable(getFiltered());
  });

  // Sort buttons: sort the main array, then redraw using the current search
  document.getElementById("sortName").addEventListener("click", function () {
    people.sort(function (a, b) { return a.name.localeCompare(b.name); });
    renderTable(getFiltered());
  });

  document.getElementById("sortAge").addEventListener("click", function () {
    people.sort(function (a, b) { return a.age - b.age; });
    renderTable(getFiltered());
  });

  // Show everything when the page loads
  renderTable(people);
}
