const form = document.getElementById("expenseForm");
const descInput = document.getElementById("desc");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");
const tableBody = document.querySelector("#summaryTable tbody");
const totalSpan = document.getElementById("total");

let expenses = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const desc = descInput.value.trim();
  const category = categoryInput.value;
  const amount = parseFloat(amountInput.value);

  if (desc && category && !isNaN(amount)) {
    const expense = {
      id: Date.now(),
      desc,
      category,
      amount,
    };
    expenses.push(expense);
    renderTable();
    descInput.value = "";
    categoryInput.value = "";
    amountInput.value = "";
  }
});

function renderTable() {
  tableBody.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${exp.desc}</td>
      <td>${exp.category}</td>
      <td>₹${exp.amount}</td>
      <td><button onclick="deleteExpense(${exp.id})">❌</button></td>
    `;

    tableBody.appendChild(tr);
    total += exp.amount;
  });

  totalSpan.textContent = total.toFixed(2);
}

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  renderTable();
}
