/*
<div class="item_wrapper">
          <div class="content"><p id="task1">Bo'sh</p></div>
          <div class="check"><input type="checkbox" /></div>
          <div class="delete"><button>x</button></div>
        </div>
*/
const tasks = [];
const adder = document.getElementById("addTask");
const input = document.getElementById("task");
const wrapper = document.getElementById("wrapper");
let hisobchi = 0;

adder.addEventListener("click", () => {
  let value = input.value;
  input.value = "";
  tasks.push({
    id: hisobchi,
    mazmun: value,
    checked: false,
  });
  hisobchi += 1;
  renderQilish();
});

function renderQilish() {
  wrapper.innerHTML = "";
  tasks.forEach((task) => {
    let itemWrapper = document.createElement("div");
    itemWrapper.className = "item_wrapper";
    const content = document.createElement("div");
    content.className = "content";
    const p = document.createElement("p");
    p.innerText = task.mazmun;
    content.appendChild(p);
    itemWrapper.appendChild(content);
    const check = document.createElement("div");
    check.className = "check";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = task.id;
    input.checked = task.checked;
    // input.onclick = (e) => {
    //   const id = e.target.id;
    //   const currentTask = tasks.find((tt) => tt.id == id);
    //   currentTask.checked = e.target.checked;
    //   renderQilish();
    // };
    check.appendChild(input);
    itemWrapper.appendChild(check);
    const delete1 = document.createElement("div");
    delete1.className = "delete";
    const btn = document.createElement("button");
    btn.innerText = "x";
    delete1.appendChild(btn);
    itemWrapper.appendChild(delete1);
    wrapper.appendChild(itemWrapper);
  });
}
