const assert = require("chai").assert;

class TaskManager {
  constructor(currentId = 0) {
    //Check if there is anything saved in local storage. If there is set this.tasks array to the contents in local storage
    // let savedTaskList = localStorage.getItem("savedList");
    // let savedCurrentId = localStorage.getItem("currentId");
    //   if (savedTaskList && savedCurrentId) {
    //     this.tasks = JSON.parse(savedTaskList);
    //     this.load(this.tasks);
    //     this.currentId = this.tasks.length;
    //   }
    //   //If nothing is stored in local storage, set this.tasks array to an empty array.
    //   else {
    this.tasks = [];
    this.currentId = currentId;
    //   }
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
    return this.tasks;
  }
}

let task = new TaskManager();
describe("TaskManager", () => {
  describe(".addTask", () => {
    it("adds task object to the task array", () => {
      const expectedResult = "object";
      const result = typeof task.addTask();
      assert.ok(result == expectedResult);
    });
  });
});
