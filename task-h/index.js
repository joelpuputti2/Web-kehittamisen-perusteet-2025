// index.js
// Author: Joel Puputti
// Date: 12.11.2025
// Handles adding new course rows with day marks (✅/❌)

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addpersonForm");
  const tbody = document.getElementById("timetable").querySelector("tbody");
  // Helper to show/hide error messages
  function showError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    if (message) {
      el.textContent = message;
      el.classList.remove('hidden');
    } else {
      el.textContent = '';
      el.classList.add('hidden');
    }
  }

  function clearErrors() {
    ['err-fullName','err-email','err-phone','err-date','err-accept'].forEach(id => showError(id, ''));
  }

  // Clear field error on input/change
  ['fullName','email','phone','date','accept'].forEach(name => {
    const el = document.getElementById(name);
    if (!el) return;
    el.addEventListener('input', () => showError('err-'+name, ''));
    el.addEventListener('change', () => showError('err-'+name, ''));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const fullName = (form.elements['fullName']?.value || '').trim();
    const email = (form.elements['email']?.value || '').trim();
    const phone = (form.elements['phone']?.value || '').trim();
    const date = form.elements['date']?.value || '';
    const accept = form.elements['accept']?.checked || false;

    // Custom validation messages (Finnish same as original)
    let firstInvalid = null;
    if (!fullName) {
      showError('err-fullName', 'Kirjoita nimesi tähän kenttään');
      firstInvalid = firstInvalid || document.getElementById('fullName');
    }
    if (!email) {
      showError('err-email', 'Kirjoita sähköpostisi tähän kenttään');
      firstInvalid = firstInvalid || document.getElementById('email');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError('err-email', 'Anna kelvollinen sähköpostiosoite');
      firstInvalid = firstInvalid || document.getElementById('email');
    }
    if (!phone) {
      showError('err-phone', 'Kirjoita puhelinnumerosi tähän kenttään');
      firstInvalid = firstInvalid || document.getElementById('phone');
    }
    if (!date) {
      showError('err-date', 'Valitse syntymäpäiväsi tästä kentästä');
      firstInvalid = firstInvalid || document.getElementById('date');
    }
    if (!accept) {
      showError('err-accept', 'Hyväksy käyttöehdot');
      firstInvalid = firstInvalid || document.getElementById('accept');
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Create row values: timestamp + form fields
    const timestamp = new Date().toLocaleString();

    const row = document.createElement('tr');
    [timestamp, fullName, email, phone, date].forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });

    tbody.appendChild(row);

    // Reset form and focus first input
    form.reset();
    form.elements['fullName']?.focus();
  });
});
