const button = document.getElementById("btnAdd");
const taskList = document.getElementById("tasklist");
const newTask = document.getElementById("inPUT");
const task = [];

button.addEventListener("click", () => {
  const value = newTask.value;
  if (newTask.value != "") {
    newTask.value = "";
    const taskDiv = document.createElement("div");
    const taskNumber = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    taskNumber.textContent = value;
    deleteBtn.textContent = "X";
    taskList.appendChild(taskDiv);
    taskDiv.appendChild(taskNumber);
    taskDiv.appendChild(input);
    taskDiv.appendChild(deleteBtn);
    if (input.checked == false) {
      taskNumber.parentElement.style.opacity = "0.5";
    }
    deleteBtn.addEventListener("click", () => {
      deleteBtn.parentElement.remove();
    });
  }
});
