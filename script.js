const checkBoxList = document.querySelectorAll(".checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".bar");
const errorLabel = document.querySelector(".warninglabel");
const progressValue = document.querySelector(".barpercentage");

let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};


function updateProgressBar() {
  const completedGoalsCount = Object.values(allGoals).filter(goal => goal.completed).length;
  const totalGoalsCount = Object.keys(allGoals).length;
  const percentage =  (completedGoalsCount / totalGoalsCount) * 100 ;
  
  progressValue.style.width = `${percentage}%`;
  progressValue.querySelector('p').textContent = `${completedGoalsCount}/${totalGoalsCount} Completed`;
}


updateProgressBar();

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    const allGoalAdded = [...inputFields].every((input) => input.value.trim());

    if (allGoalAdded) {
      const parent = checkbox.parentElement;
      parent.classList.toggle("completed");
      
      const inputId = checkbox.nextElementSibling.id;
      if (allGoals[inputId]) {
        allGoals[inputId].completed = !allGoals[inputId].completed;
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
        updateProgressBar();
      }
    } else {
      progressBar.classList.add("show-error");
      errorLabel.classList.add("warningshow");
    }
  });
});

inputFields.forEach((input) => {
  const goalId = input.id;
  if (allGoals[goalId]) {
    input.value = allGoals[goalId].name;
    if (allGoals[goalId].completed) {
      input.parentElement.classList.add("completed");
    }
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
    errorLabel.classList.remove("warningshow");
  });

  input.addEventListener("input", (e) => {
    const goalId = e.target.id;
    allGoals[goalId] = {
      name: e.target.value,
      completed:  false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    updateProgressBar();
  });
});
