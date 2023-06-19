const elt = (name, className) => {
  let element = document.createElement(name);
  if (className != null) element.className = className;
  return element;
};
const gId = (idName) => document.getElementById(idName);

let CURRENT_TASK_NAME = "";

const createNF = gId("createNF");
const inputCTF = gId("inputCTF");
const cateScroll = gId("newTaskFolders");
const addBtn = gId("task_add_button");

const tasksWrapper = gId("task_list");
const adder = gId("task_adder");
const label = gId("task_label");
const subTaskInput = gId("sub_task_inputA");

subTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewTask();
});

const allTasks = JSON.parse(localStorage.getItem("category")) ?? [];
console.log(allTasks);
const Tasks = JSON.parse(localStorage.getItem("Tasks")) ?? {
  names: {},
  checked: {},
  bookmark: {},
};
console.log(Tasks);
let theme_localhost = localStorage.getItem("theme") ?? "light";
console.log(theme_localhost);

createNF.addEventListener("click", function folderAdd() {
  const valueTF = inputCTF.value;
  console.log(allTasks);
  if (valueTF != "" && !allTasks.includes(valueTF)) {
    inputCTF.value = "";
    allTasks.push(valueTF);
    Tasks.names = { valueTF };
    Tasks.checked = "false";
    Tasks.bookmark = "tanlangan";
    save();
    render();
  }
});

function save() {
  localStorage.setItem("category", JSON.stringify(allTasks));
  localStorage.setItem("Tasks", JSON.stringify(Tasks));
  localStorage.setItem("theme", theme_localhost);
}

const addNewTask = () => {
  let inputVal = subTaskInput.value;
  if (inputVal !== "" && !Tasks[CURRENT_TASK_NAME].includes(inputVal)) {
    Tasks[CURRENT_TASK_NAME].unshift(inputVal);
    tasklistyarat();
    save();
    subTaskInput.value = "";
  }
};

addBtn.addEventListener("click", addNewTask);

const theme = document.getElementById("dark_light");

theme.addEventListener("click", () => {
  if (theme_localhost == "light") theme_localhost = "dark";
  else theme_localhost = "light";
  save();
  // funksiya qilish kerak
});

function render() {
  cateScroll.innerHTML = "";
  allTasks.forEach((task) => {
    let taskGroupnew = document.createElement("div");
    taskGroupnew.className = "taskgroup";
    const taskFI = document.createElement("div");
    const taskFN = document.createElement("div");
    const taskCM = document.createElement("div");
    const taskIcon = document.createElement("i");
    taskIcon.className = "fa-solid fa-list";
    const taskName = document.createElement("p");
    taskName.textContent = task;
    const taskContextMenu = document.createElement("i");
    taskContextMenu.className = "fa-solid fa-ellipsis-vertical";
    cateScroll.appendChild(taskGroupnew);
    taskGroupnew.appendChild(taskFI);
    taskGroupnew.appendChild(taskFN);
    taskGroupnew.appendChild(taskCM);
    taskFI.appendChild(taskIcon);
    taskFN.appendChild(taskName);
    taskCM.appendChild(taskContextMenu);
    taskGroupnew.id = task;
    taskGroupnew.addEventListener("click", (item) => {
      CURRENT_TASK_NAME = task;
      showAdder();
      tasklistyarat(task);
      active_Task_Folder();
    });
  });
}

function active_Task_Folder() {
  allTasks.forEach((item) => {
    if (item === CURRENT_TASK_NAME) gId(item).classList.add("defined_area");
    else gId(item).classList.remove("defined_area");
  });
}

function tasklistyarat() {
  console.log(Tasks[CURRENT_TASK_NAME]);
  label.querySelector("p").innerText = CURRENT_TASK_NAME;
  tasksWrapper.innerHTML = "";
  if (Tasks[CURRENT_TASK_NAME].length > 0) {
    Tasks[CURRENT_TASK_NAME].forEach((item) => {
      folderChildyarat(item);
    });
  }
}

function folderChildyarat(item) {
  const folderchild = document.createElement("div");
  folderchild.className = "folderchild";
  folderchild.id = item;
  const folderchilddiv = document.createElement("div");
  const folderchildinp = document.createElement("input");
  folderchildinp.type = "checkbox";
  folderchildinp.checked = false;
  const folderchildp = document.createElement("p");
  folderchildp.textContent = item;
  const folderchildBMark = document.createElement("div");
  folderchildBMark.className = "bookmark";
  const fChildBookMark = elt("i", "fa-regular fa-bookmark");
  const deleteBtn = elt("i", "fa fa-trash red-btn");
  //  /////////////////////////////////////////////////////////////////
  deleteBtn.addEventListener("click", () => {
    Tasks[CURRENT_TASK_NAME] = Tasks[CURRENT_TASK_NAME].filter(
      (task) => task !== item
    );
    save();
    let self = gId(item);
    self.parentNode.removeChild(self);
  });
  let actionWrapper = elt("div", "bookmark");
  actionWrapper.appendChild(fChildBookMark);
  actionWrapper.appendChild(deleteBtn);
  tasksWrapper.appendChild(folderchild);
  folderchild.appendChild(folderchilddiv);
  folderchilddiv.appendChild(folderchildinp);
  folderchilddiv.appendChild(folderchildp);
  folderchild.appendChild(actionWrapper);
}

render();

const showAdder = () => {
  if (CURRENT_TASK_NAME !== "") {
    adder.style.display = "block";
  } else {
    adder.style.display = "none";
  }
};
showAdder();
