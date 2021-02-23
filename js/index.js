// /Get form inputs and save to variables
const newTaskNameInput = document.getElementById("taskName");
const newTaskDescription = document.getElementById("description");
const newTaskAssignedTo = document.getElementById("assigned");
const newTaskDueDate = document.getElementById("date");
const newTaskStatus = document.getElementById("status");
const submitButton = document.getElementById("subAddTask");
const listContainer = document.getElementById("list-container");
const ContainerR = document.getElementById("task-display");
const ll = document.getElementById("ll");
// const finalTask = document.getElementById("final-task");

const formRegistration = document.getElementById("form");
const errorDisplay = document.getElementById("error-display");

//Create a new instance of our TaskManager class
const newTaskList = new TaskManager();
let count = [];
formRegistration.addEventListener("submit", (e) => {
  // e.preventDefault();
  let messages = [];

  //get form input values from index.html
  let taskName = newTaskNameInput.value;
  let description = newTaskDescription.value;
  let assignedTo = newTaskAssignedTo.value;
  let dueDate = newTaskDueDate.value;

  if (taskName === "" || taskName === null) {
    messages.push("Task name is required");
    count.push(1);
  }
  if (description === "" || description === null) {
    messages.push("Task Description is blank");
    count.push(2);
  }
  if (assignedTo === "" || assignedTo === null) {
    messages.push("Assigned to is required");
    count.push(3);
  }
  if (dueDate === "" || dueDate === null) {
    messages.push("Due date is blank");
    count.push(4);
  }
  if (messages.length > 0 && count.length < 5) {
    e.preventDefault();
    errorDisplay.style.display = "block";
    for (let i = 0; i < messages.length; i++) {
      errorDisplay.innerHTML += messages[i] + "<br>";
    }
    // errorDisplay.innerText = messages.join(", ");
  }
  if (messages.length === 0) {
    // e.preventDefault();
    newTaskList.addTask(taskName, description, assignedTo, dueDate);
    ContainerR.style.display = "block";

    newTaskList.render();
    newTaskList.save();

    //clear the form input fields
    clearFormFields();
  }
});

listContainer.addEventListener("click", (e) => {
  let selected = e.target;
  //Check if the selected button is the Mark as done button and if it is, we set its status to DONE
  if (selected.classList.contains("done-button")) {
    let parentTask = selected.parentElement.parentElement;
    //Get the html of the task so we can change the html displayed on the webpage
    let statusHtml = parentTask.getElementsByClassName("status")[0];
    let taskId = parseInt(parentTask.attributes.id.value);
    //Update newTaskList.tasks array with the Done STATUS
    newTaskList["tasks"][taskId]["status"] = "DONE";
    statusHtml.innerHTML = "DONE";
    //Save the new status to local storage
    newTaskList.save();
  }
  //Check if the selected button is the Delete button and if it is, we remove it from the HTML and from the array
  if (selected.classList.contains("delete-button")) {
    let parentTask = selected.parentElement.parentElement;
    //Get the id of the selected task
    let taskId = parseInt(parentTask.attributes.id.value);
    //remove the selected task from the array using .splice()
    newTaskList["tasks"].splice(taskId, 1);

    //Remove the elements HTML from the page
    parentTask.remove();
    //Save the array to local storage
    newTaskList.save();
    //Refresh the page. If you don't refresh the page after deleting a task from the array, when you try to create another task it will give you an error because the ids are not in order
    location.reload();
  }
});

//clear the form input fields after new task is submitted
function clearFormFields() {
  newTaskNameInput.value = "";
  newTaskDescription.value = "";
  newTaskAssignedTo.value = "";
  newTaskDueDate.value = "";
  newTaskStatus.value = "";
}
ll.addEventListener("submit", () => {
  ll.style.display = "block";
});
