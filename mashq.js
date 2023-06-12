const elt = (name, className) => {
  let element = document.createElement(name);
  if (className != null) element.className = className;
  return element;
};
const gId = (idName) => document.getElementById(idName);
const createNF = gId("createNF");
const inputCTF = document.getElementById("inputCTF");
const cateScroll = document.getElementById("newTaskFolders");
const tasklar = document.getElementById("tasklar");

const allTasks = JSON.parse(localStorage.getItem("category")) ?? [];
console.log(allTasks);
const Tasks = JSON.parse(localStorage.getItem("Tasks")) ?? {};
console.log(Tasks);
createNF.addEventListener("click", () => {
  const valueTF = inputCTF.value;
  console.log(allTasks);
  if (valueTF != "" && !allTasks.includes(valueTF)) {
    inputCTF.value = "";
    allTasks.push(valueTF);
    Tasks[valueTF] = [];
    save();
    render();
  }
});

function save() {
  localStorage.setItem("category", JSON.stringify(allTasks));
  localStorage.setItem("Tasks", JSON.stringify(Tasks));
}

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
    taskGroupnew.addEventListener("click", () => {
      tasklistyarat(task);
    });
  });
}

function tasklistyarat(task) {
  tasklar.innerHTML = "";
  const taskLabel = document.createElement("div");
  taskLabel.className = "tasklabel";
  const iBar = document.createElement("i");
  iBar.className = "fa-solid fa-bars";
  const taskLabelValue = document.createElement("div");
  taskLabelValue.className = "tasklabelvalue";
  const taskLabelValueP = document.createElement("p");
  taskLabelValueP.textContent = task;
  const ellipsis = document.createElement("i");
  ellipsis.className = "fa-solid fa-ellipsis";
  tasklar.append(taskLabel);
  taskLabel.appendChild(iBar);
  taskLabel.appendChild(taskLabelValue);
  taskLabelValue.appendChild(taskLabelValueP);
  taskLabel.appendChild(ellipsis);
  // TaskLabel yaratildi endi tasklarni qoshishimiz uchun foraddatask ni yaratishimiz kerak
  const forAdd_aTasks = document.createElement("div");
  forAdd_aTasks.className = "foraddatasks";
  const add_aTaskInput = document.createElement("div");
  add_aTaskInput.className = "addataskinput";
  const addataskinputA = document.createElement("input");
  addataskinputA.className = "addataskinputA";
  addataskinputA.addEventListener("keydown", (e) => {
    let input = e.target;

    if (
      e.key === "Enter" &&
      input.value !== "" &&
      !Tasks[task].includes(input.value)
    ) {
      Tasks[task].push(input.value);
      save();
      folderChildyarat(input.value);
    }
  });
  const addataskAdd = document.createElement("div");
  addataskAdd.className = "addataskadd";
  const chapTugmalar = document.createElement("div");
  const tugmaCalendar = document.createElement("i");
  tugmaCalendar.className = "fa-solid fa-calendar-days";
  const tugmaBell = document.createElement("i");
  tugmaBell.className = "fa-solid fa-bell";
  const tugmaRepeat = document.createElement("i");
  tugmaRepeat.className = "fa-solid fa-repeat";
  const ungTugma = document.createElement("div");
  const tugmaButton = document.createElement("button");
  tugmaButton.textContent = "Add";
  tasklar.appendChild(forAdd_aTasks);
  forAdd_aTasks.appendChild(add_aTaskInput);
  add_aTaskInput.appendChild(addataskinputA);
  forAdd_aTasks.appendChild(addataskAdd);
  addataskAdd.appendChild(chapTugmalar);
  chapTugmalar.appendChild(tugmaCalendar);
  chapTugmalar.appendChild(tugmaBell);
  chapTugmalar.appendChild(tugmaRepeat);
  addataskAdd.appendChild(ungTugma);
  ungTugma.appendChild(tugmaButton);
  tugmaButton.addEventListener("click", () => {
    const addInput = addataskinputA.value;
    if (addInput != "" && !Tasks[task].includes(addInput)) {
      addataskinputA.value = "";
      Tasks[task].push(addInput);
      save();
      folderChildyarat(addInput);
    }
  });
  console.log(task);
  if (Tasks[task].length > 0) {
    let list = gId("tasklistasds");
    if (list != null) list.innerHTML = "";
    Tasks[task].forEach((item) => {
      folderChildyarat(item);
    });
  }
}

function folderChildyarat(item) {
  const taskslist = document.createElement("div");
  taskslist.className = "taskslist";
  taskslist.id = "tasklist";
  const folderchild = document.createElement("div");
  folderchild.className = "folderchild";
  const folderchilddiv = document.createElement("div");
  const folderchildinp = document.createElement("input");
  folderchildinp.type = "checkbox";
  const folderchildp = document.createElement("p");
  folderchildp.textContent = item;
  const folderchildBMark = document.createElement("div");
  folderchildBMark.className = "bookmark";
  const fChildBookMark = document.createElement("i");
  fChildBookMark.className = "fa-regular fa-bookmark";
  tasklar.appendChild(taskslist);
  taskslist.appendChild(folderchild);
  folderchild.appendChild(folderchilddiv);
  folderchilddiv.appendChild(folderchildinp);
  folderchilddiv.appendChild(folderchildp);
  folderchild.appendChild(folderchildBMark);
  folderchildBMark.appendChild(fChildBookMark);
}

render();
