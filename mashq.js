const elt = (name, className) => {
  let element = document.createElement(name)
  if (className != null) element.className = className
  return element
}
const gId = (idName) => document.getElementById(idName)

let CURRENT_TASK_NAME = ""

const createNF = gId("createNF")
const inputCTF = gId("inputCTF")
const cateScroll = gId("newTaskFolders")
const addBtn = gId("task_add_button")

const tasksWrapper = gId("task_list")
const adder = gId("task_adder")
const label = gId("task_label")
const subTaskInput = gId("sub_task_inputA")

subTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNewTask()
})

const allTasks = JSON.parse(localStorage.getItem("category")) ?? []
console.log(allTasks)
const Tasks = JSON.parse(localStorage.getItem("Tasks")) ?? {}
console.log(Tasks)

createNF.addEventListener("click", () => {
  const valueTF = inputCTF.value
  console.log(allTasks)
  if (valueTF != "" && !allTasks.includes(valueTF)) {
    inputCTF.value = ""
    allTasks.push(valueTF)
    Tasks[valueTF] = []
    save()
    render()
  }
})

function save() {
  localStorage.setItem("category", JSON.stringify(allTasks))
  localStorage.setItem("Tasks", JSON.stringify(Tasks))
}

const addNewTask = () => {
  let inputVal = subTaskInput.value
  if (inputVal !== "" && !Tasks[CURRENT_TASK_NAME].includes(inputVal)) {
    Tasks[CURRENT_TASK_NAME].push(inputVal)
    tasklistyarat()
    save()
    subTaskInput.value = ""
  }
}

addBtn.addEventListener("click", addNewTask)

function render() {
  cateScroll.innerHTML = ""
  allTasks.forEach((task) => {
    let taskGroupnew = document.createElement("div")
    taskGroupnew.className = "taskgroup"
    const taskFI = document.createElement("div")
    const taskFN = document.createElement("div")
    const taskCM = document.createElement("div")
    const taskIcon = document.createElement("i")
    taskIcon.className = "fa-solid fa-list"
    const taskName = document.createElement("p")
    taskName.textContent = task
    const taskContextMenu = document.createElement("i")
    taskContextMenu.className = "fa-solid fa-ellipsis-vertical"
    cateScroll.appendChild(taskGroupnew)
    taskGroupnew.appendChild(taskFI)
    taskGroupnew.appendChild(taskFN)
    taskGroupnew.appendChild(taskCM)
    taskFI.appendChild(taskIcon)
    taskFN.appendChild(taskName)
    taskCM.appendChild(taskContextMenu)
    taskGroupnew.addEventListener("click", () => {
      CURRENT_TASK_NAME = task
      showAdder()
      tasklistyarat(task)
    })
  })
}

function tasklistyarat() {
  label.querySelector("p").innerText = CURRENT_TASK_NAME
  tasksWrapper.innerHTML = ""
  if (Tasks[CURRENT_TASK_NAME]?.length > 0) {
    Tasks[CURRENT_TASK_NAME].reverse().forEach((item) => {
      folderChildyarat(item)
    })
  }
}

function folderChildyarat(item) {
  const folderchild = document.createElement("div")
  folderchild.className = "folderchild"
  folderchild.id = item
  const folderchilddiv = document.createElement("div")
  const folderchildinp = document.createElement("input")
  folderchildinp.type = "checkbox"
  const folderchildp = document.createElement("p")
  folderchildp.textContent = item
  const folderchildBMark = document.createElement("div")
  folderchildBMark.className = "bookmark"
  const fChildBookMark = elt("i", "fa fa-bookmark")
  const deleteBtn = elt("i", "fa fa-trash red-btn")
  deleteBtn.addEventListener("click", () => {
    Tasks[CURRENT_TASK_NAME] = Tasks[CURRENT_TASK_NAME].filter(
      (task) => task !== item,
    )
    save()
    let self = gId(item)
    self.parentNode.removeChild(self)
  })
  let actionWrapper = elt("div")
  actionWrapper.appendChild(fChildBookMark)
  actionWrapper.appendChild(deleteBtn)
  tasksWrapper.appendChild(folderchild)
  folderchild.appendChild(folderchilddiv)
  folderchilddiv.appendChild(folderchildinp)
  folderchilddiv.appendChild(folderchildp)
  folderchild.appendChild(actionWrapper)
}

render()

const showAdder = () => {
  if (CURRENT_TASK_NAME !== "") {
    adder.style.display = "block"
  } else {
    adder.style.display = "none"
  }
}
showAdder()
