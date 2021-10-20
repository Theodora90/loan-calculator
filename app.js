// Listen for click
document.getElementById("loan-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // hide results
  document.querySelector(".results").style.display = "none";
  // show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

// Calculate results
function calculateResults() {
  // UI Variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute the monhtly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principle).toFixed(2);
    // hide results
    document.querySelector(".results").style.display = "block";
    // show loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

// Show error
function showError(error) {
  // hide results
  document.querySelector(".results").style.display = "none";
  // show loader
  document.getElementById("loading").style.display = "none";
  // create a Div
  const errorDiv = document.createElement("Div");
  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // Add class
  errorDiv.className = "alert alert-danger";
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3secs
  setTimeout(clearerror, 3000);

  function clearerror() {
    document.querySelector(".alert").remove();
  }
}
