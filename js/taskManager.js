let taskNumber = 1;

class TaskManager {
  constructor(currentId = 0) {
    //Check if there is anything saved in local storage. If there is set this.tasks array to the contents in local storage
    let savedTaskList = localStorage.getItem("savedList");
    // let savedCurrentId = localStorage.getItem("currentId");
    if (savedTaskList) {
      this.tasks = JSON.parse(savedTaskList);
      this.load(this.tasks);
      this.currentId = this.tasks.length;
    }
    //If nothing is stored in local storage, set this.tasks array to an empty array.
    else {
      this.tasks = [];
      this.currentId = currentId;
    }
  }
  addTask(name, description, assignedTo, dueDate, status = "TODO") {
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
    this.tasks.push({
      id: this.currentId,
      name: this.name,
      description: this.description,
      assignedTo: this.assignedTo,
      dueDate: this.dueDate,
      status: this.status,
    });
  }
  render() {
    let newHtml = `<li id="${
      this.tasks[this.currentId]["id"]
    }" class="task-card">
 
            <div class="card-text">${this.tasks[this.currentId]["name"]}</div>
                <div class="card-text">${
                  this.tasks[this.currentId]["description"]
                }</div>
                <div class="card-text">${
                  this.tasks[this.currentId]["assignedTo"]
                }</div>
                <div class="card-text">${
                  this.tasks[this.currentId]["dueDate"]
                }</div>
                <div class="status">${
                  this.tasks[this.currentId]["status"]
                }</div>
                <div><button class="done-button btn-success">Mark Done</button></div>
                <div><button class="delete-button btn-danger"">Delete</button></div>
            </li>`;
    listContainer.insertAdjacentHTML("beforeend", newHtml);
    this.currentId++;
  }
  save() {
    localStorage.setItem("savedList", JSON.stringify(this.tasks));
    // localStorage.setItem("currentId", JSON.stringify(this.currentId));
  }
  //This method is used to display the data stored in local storage onto the screen

  load(thisLoadTasks) {
    for (let i = 0; i < thisLoadTasks.length; i++) {
      let newHtml = `<li id="${thisLoadTasks[i]["id"]}" class="task-card card border-primary col-4">
                     <h5 class="card-header list-part font-weight-bold text-center"
          >
          Task${taskNumber}
        </h5>
                <div class="card-text">Task Name: ${thisLoadTasks[i]["name"]}</div>
                <div class="card-text">Description: ${thisLoadTasks[i]["description"]}</div>
                <div class="card-text">Assigned To: ${thisLoadTasks[i]["assignedTo"]}</div>
                <div class="card-text">Due date: ${thisLoadTasks[i]["dueDate"]}</div>
           
                <div class="status">${thisLoadTasks[i]["status"]}</div>
                <div><button class="btn done-button  btn-success">Mark As Done</button></div>
                <div><button class=" btn delete-button btn-danger ">Delete</button></div>
            </li><br>`;

      listContainer.insertAdjacentHTML("beforeend", newHtml);
      taskNumber++;
    }
  }
}
