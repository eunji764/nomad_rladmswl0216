const taskForm = document.querySelector(".js-todoForm"),
  taskInput = taskForm.querySelector("input"),
  pendingList = document.querySelector(".js-toDoList"),
  finishList = document.querySelector(".js-finishedlist");

const PENDING_LS = "PENDING",
    FINISHED_LS = "FINISHED";

let PENDING = [],
    FINISHED = [];

function getIndex(element){
    var i = 0;
    while ((element = element.previousSibling) !== null){
        i++
    }
    return i
}   

function returnTask(event){
    const returns = event.target,
        returnsLi = returns.parentNode,
        returnsIndex = getIndex(returnsLi)-1,
        returnsList = returnsLi.parentNode,
        returnsText = returnsLi.querySelector("span");
    const Text = returnsText.innerText;
    paintPendingTask(Text);

    FINISHED.splice(returnsIndex,1);

    returnsList.removeChild(returnsLi);
    saveTasks();
}

function paintFinishedTask(text){
    const liFinish = document.createElement("li"),
        deleteBtn = document.createElement("button"),
        ingBtn = document.createElement("button"),
        spanFinish = document.createElement("span"),
        newFinishId = FINISHED.length + 1;

    deleteBtn.innerHTML = " ❌";
    deleteBtn.addEventListener("click",deleteTask);
    ingBtn.innerHTML = "✅ ";
    ingBtn.addEventListener("click", returnTask);
    spanFinish.innerText = text;

    liFinish.appendChild(ingBtn);
    liFinish.appendChild(spanFinish);
    liFinish.appendChild(deleteBtn);
    liFinish.id = newFinishId;
    finishList.appendChild(liFinish);

    const finishedObj = {
        text : spanFinish.innerText,
        id : newFinishId
    }
    FINISHED.push(finishedObj);

    saveTasks();
}


function checkTask(event){
    const check = event.target,
        checkLi = check.parentNode,
        checkIndex = getIndex(checkLi)-1,
        checkList = checkLi.parentNode,
        finishText = checkLi.querySelector("span");
    
    const Text = finishText.innerText;
    paintFinishedTask(Text);
    console.log(checkIndex);
    PENDING.splice(checkIndex,1);

    checkList.removeChild(checkLi);

    saveTasks();
}

function deleteTask(event){
    const del = event.target,
        delLi = del.parentNode,
        delList = delLi.parentNode;
        
    delList.removeChild(delLi);

    if(delList === pendingList){
        const cleanPendingTasks = PENDING.filter(function(task){
            return task.id !== parseInt(delLi.id);
        });
        PENDING = cleanPendingTasks;
    } else{
        const cleanFinishedTasks = FINISHED.filter(function(task){
            return task.id !== parseInt(delLi.id);
        });
        FINISHED = cleanFinishedTasks;
    }
    saveTasks();
}

function saveTasks() {
  localStorage.setItem(PENDING_LS, JSON.stringify(PENDING));
  localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHED));
}

function paintPendingTask(text) {
  const liPending = document.createElement("li"),
    delBtn = document.createElement("button"),
    checkBtn = document.createElement("button"),
    spanPending = document.createElement("span"),
    newPendingId = PENDING.length + 1;

  delBtn.innerHTML = " ❌";
  delBtn.addEventListener("click",deleteTask);
  checkBtn.innerHTML = "⬜ ";
  checkBtn.addEventListener("click",checkTask);
  spanPending.innerText = text;

  liPending.appendChild(checkBtn);
  liPending.appendChild(spanPending);
  liPending.appendChild(delBtn);
  liPending.id = newPendingId;
  pendingList.appendChild(liPending);

  const pendingTaskObj = {
    text: text,
    id: newPendingId
  };

  PENDING.push(pendingTaskObj);
  saveTasks();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = taskInput.value;
  paintPendingTask(currentValue);
  taskInput.value = "";
}

function loadTasks() {
  const localPendingTasks = localStorage.getItem(PENDING_LS),
    localFinishedTasks = localStorage.getItem(FINISHED_LS);
  if (localPendingTasks !== null || localFinishedTasks !== null) {
    const parsedPendingTasks = JSON.parse(localPendingTasks);
    parsedPendingTasks.forEach(function(task){
        paintPendingTask(task.text);
    });
    const parsedFinishedTasks = JSON.parse(localFinishedTasks);
    parsedFinishedTasks.forEach(function(task){
        paintFinishedTask(task.text);
    });
  }
}

function init() {
  loadTasks();
  taskForm.addEventListener("submit", handleSubmit);
}

init(); 