// Select DOM Elements

const todo_text = document.querySelector("#todo_text");
const add_btn = document.querySelector(".add_btn");
const task_container = document.querySelector(".task_container");
const errorMsg = document.querySelector(".error");
const form = document.querySelector("form");
const count = document.querySelector(".count");

// select delBtn and clearBtn
const delBtn = document.querySelector(".delbtn");
const clearBtn = document.querySelector(".clearbtn");

// input & btn event
todo_text.addEventListener("keyup", taskInput);
add_btn.addEventListener("click", addBtn);

// addBtn color change
function taskInput() {
  let todoInput = todo_text.value.trim();
  if (todoInput) {
    add_btn.classList.add("active");
  } else {
    add_btn.classList.remove("active");
  }
}

// geting on todoArrays getItem
let todoArrays = JSON.parse(localStorage.getItem("todo"));
let counts = 1;

// show the todo content generator showTodo function
function showTodo() {
  let todoContent = "";
  if (todoArrays) {
    todoArrays.forEach((todoArray, id) => {
      let isCompleted = todoArray.status == "Completed" ? "checked" : "";
      todoArray.status == "Completed" ? "checked" : "";
      todoContent += `
      <div class="task_content">
        <div class="task">
          <label for='${id}'>
              <input type="checkbox" id='${id}' onclick='updateTask(this)' ${isCompleted} name="todo" />
              <p class='${isCompleted}' id='todoCheck'>${todoArray.todo}</p></label>
          </div>

          <div class="delbtn" title='DeleteTask' onclick='deleteTask(${id})'>
            <i class="fa fa-trash-o"></i>
          </div>      
    </div>
      `;
    });
  }
  task_container.innerHTML = todoContent; // task is inset for task_container

  todo_text.value = ""; // todo_text value is clear

  taskInput(); // addBtn color change

  count.innerHTML = todoArrays.length; // count on todoTask length

  clearBtnColor(); //clearBtnColor color change
}
// call showTodo function
showTodo();

localStorage.setItem("todo", JSON.stringify(todoArrays));

// show line-through on text and localStorage set
function updateTask(selectTask) {
  let todoCheckBox = selectTask.parentElement.lastElementChild;
  if (selectTask.checked) {
    todoCheckBox.classList.add("checked");
    todoArrays[selectTask.id].status = "Completed";
    alert("Your Task is Completed");
  } else {
    todoCheckBox.classList.remove("checked");
    todoArrays[selectTask.id].status = "pending";
    alert("Your Task is UnCompleted");
  }
  localStorage.setItem("todo", JSON.stringify(todoArrays));
}

// addTask Btn set localStorage
function addBtn() {
  let todoInput = todo_text.value.trim(); // remove unwanted spaces
  if (todoInput === "") {
    errorMsg.classList.add("active");
  } else {
    errorMsg.classList.remove("active");
    if (!todoArrays) {
      todoArrays = [];
    }

    const todoInfo = {
      todo: todoInput,
      status: "pending",
      check: "checkTodo",
    }; // set todoInput value to localStorage object to array

    todoArrays.push(todoInfo); // todoArrays push for an todoInfo obj

    localStorage.setItem("todo", JSON.stringify(todoArrays)); // set as localStorage

    showTodo();
    clearBtnColor();
  }
}

function clearBtnColor() {
  if (todoArrays.length > 0) {
    clearBtn.classList.add("active");
  } else {
    clearBtn.classList.remove("active");
  }
}

// deleteBtn is remove the localStorage for todoTask content
function deleteTask(id) {
  todoArrays.splice(id, 1);
  count.innerHTML = todoArrays.length;
  localStorage.setItem("todo", JSON.stringify(todoArrays));
  showTodo();
}

// clearBtn is removeAll the localStorage for todoTask content
clearBtn.addEventListener("click", clearTask);
function clearTask() {
  todoArrays.splice(0, todoArrays.length);
  localStorage.setItem("todo", JSON.stringify(todoArrays));
  showTodo();
}
