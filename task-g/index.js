// index.js
// Author: Joel Puputti
// Date: 7.11.2025
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addpersonForm");
  const tbody = document.getElementById("timetable").querySelector("tbody");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Read values from the form
    const fullName = (form.elements["fullName"]?.value || "").trim();
    const email = (form.elements["email"]?.value || "").trim();
    const phone = (form.elements["phone"]?.value || "").trim();
    const date = form.elements["date"]?.value || "";

    const dateInput = form.elements["date"];
    if (date > new Date().toISOString().split("T")[0]) {
      dateInput?.setCustomValidity("Syntymäaikasi ei voi olla tulevaisuudessa!.");
      dateInput?.reportValidity();
      return;
    } else {
      dateInput?.setCustomValidity("");
    }

    // Create row values: timestamp + form fields
    const timestamp = new Date().toLocaleString();

    const row = document.createElement("tr");
    [timestamp, fullName, email, phone, date].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    tbody.appendChild(row);

    // Reset form and focus first input
    form.reset();
    form.elements["fullName"]?.focus();
  });
});
