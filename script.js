(function () {
  //selectors
  let weeklyIncomeDisplay = document.querySelector("#weeklyIncomeDisplay");
  let weeklyIncomeInput = document.querySelector("#weeklyIncomeInput");
  let updateIncomeButton = document.querySelector("#updateIncomeButton");
  let expenseDropdown = document.querySelector("#expenseDropdown");
  let weeklyExpenseInput = document.querySelector("#weeklyExpenseInput");
  let addExpenseButton = document.querySelector("#addExpenseButton");
  let remainingBalance = document.querySelector("#remainingBalance");
  let remainingBalanceHover = document.getElementById("remainingBalanceNav");
  let weeklySpendingHover = document.getElementById("weeklySpendingNav");

  //variables
  let weeklyIncome = 0;
  let billsExpenses = 0;
  let foodExpenses = 0;
  let clothingExpenses = 0;
  let entertainmentExpenses = 0;
  let miscExpenses = 0;
  let balance = 0;
  let totalExpenses = 0;

  function drawChart() {
    let data = google.visualization.arrayToDataTable([
      ["Expense", "$"],
      ["Bills", billsExpenses],
      ["Food", foodExpenses],
      ["Clothing", clothingExpenses],
      ["Entertainment", entertainmentExpenses],
      ["Miscellaneous", miscExpenses],
    ]);

    let options = {
      title: "Overall Spending",
      is3D: true,
    };

    let chart = new google.visualization.PieChart(
      document.getElementById("piechart")
    );

    chart.draw(data, options);
  }

  //function that calculates the remaining balance
  function calculateBalance() {
    balance = weeklyIncome - totalExpenses;
    if (balance <= 0) {
      alert("You are over budget!");
    }
  }

  //event listener on income button
  updateIncomeButton.addEventListener("click", (event) => {
    event.preventDefault();

    //declaring weeklyIncome to be equal to the value of the input
    weeklyIncome = weeklyIncomeInput.value;

    //call function to calculate balance
    calculateBalance();

    //displaying 'Weekly Income:' and then value of the income
    weeklyIncomeDisplay.innerText = `Weekly Income: $${parseFloat(
      weeklyIncome
    ).toFixed(2)}`;

    //display the balance correctly upon updating income
    remainingBalance.innerText = `Balance: $${parseFloat(balance).toFixed(2)}`;
  });

  //event listener on expense button
  addExpenseButton.addEventListener("click", (event) => {
    event.preventDefault();

    //add variable to store input value
    let expenseName = weeklyExpenseName.value;
    let expenseAmount = parseFloat(weeklyExpenseInput.value);
    let expense = {
      name: expenseName,
      amount: expenseAmount,
    };

    //create new element for the expense to display
    let newExpense = document.createElement("p");
    newExpense.innerText = `${expense.name} $${expense.amount.toFixed(2)}`;
    expenseSection.append(newExpense);

    //add variable to determine selection
    let selection = parseInt(expenseDropdown.value);

    //add a class depending on selection
    if (selection === 4) {
      newExpense.classList.add("billsClass");
    } else if (selection === 3) {
      newExpense.classList.add("foodClass");
    } else if (selection === 2) {
      newExpense.classList.add("clothingClass");
    } else if (selection === 1) {
      newExpense.classList.add("entertainmentClass");
    } else {
      newExpense.classList.add("miscClass");
    }

    //adding all bills together
    let sumBills = () => {
      if (newExpense.classList.contains("billsClass")) {
        return (billsExpenses += expenseAmount);
      }
    };
    sumBills();

    //adding all food together
    let sumFood = () => {
      if (newExpense.classList.contains("foodClass")) {
        return (foodExpenses += expenseAmount);
      }
    };
    sumFood();

    //adding all clothing together
    let sumClothing = () => {
      if (newExpense.classList.contains("clothingClass")) {
        return (clothingExpenses += expenseAmount);
      }
    };
    sumClothing();

    //adding all entertainment together
    let sumEntertainment = () => {
      if (newExpense.classList.contains("entertainmentClass")) {
        return (entertainmentExpenses += expenseAmount);
      }
    };
    sumEntertainment();

    //adding all misc together
    let sumMisc = () => {
      if (newExpense.classList.contains("miscClass")) {
        return (miscExpenses += expenseAmount);
      }
    };
    sumMisc();

    //adding all expenses together
    let sumTotal = () => {
      totalExpenses += expenseAmount;
    };
    sumTotal();

    //call function to calculate balance
    calculateBalance();

    //display new balance
    remainingBalance.innerText = `Balance: $${parseFloat(balance).toFixed(2)}`;

    //pie chart
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  });

  //navagation
  weeklySpendingHover.addEventListener("mouseover", spendingHover);
  remainingBalanceHover.addEventListener("mouseover", budgetHover);

  function spendingHover(e) {
    e.target.innerText = totalExpenses;
  }
  function budgetHover(e) {
    e.target.innerText = balance;
  }

  weeklySpendingHover.addEventListener("mouseleave", spendingNotHover);
  remainingBalanceHover.addEventListener("mouseleave", remainingNotHover);

  function spendingNotHover(e) {
    e.target.innerText = "Weekly Spending";
  }
  function remainingNotHover(e) {
    e.target.innerText = "Remaning Balance";
  }
})();
