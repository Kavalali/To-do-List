const form = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListItems = document.getElementsByClassName('todos')[0];
const searchToDos = document.getElementById("search-todos");
const filter = document.getElementById('filter');

eventListeners();

function eventListeners() {
  form.addEventListener('submit', addTodo);
  todoListItems.addEventListener('click', removeTodoItem);
  document.addEventListener('DOMContentLoaded', loadAllToDoToUI);
  searchToDos.addEventListener("submit", clearAllToDos);
  filter.addEventListener("keyup",filterToDo)
}

function addTodo(e) {
  const inputValue = todoInput.value.trim();
  if (inputValue === '') {
    showAlert('Lütfen bir To-Do giriniz...', 'danger');
  } else {
    addTodoUI(inputValue);
    addTodoLocalStorage(inputValue);
    showAlert('To-do başarıyla eklendi...', 'success');
  }
  e.preventDefault();
}

function addTodoUI(inputValue) {
  const userInput = document.createElement('div');
  const userMessage = document.createElement('label');
  const checkBox = document.createElement('input');
  const inputSymbol = document.createElement('i');

  userMessage.className = "userTodos"
  userInput.className = 'todo';
  checkBox.className = 'done';
  checkBox.type = 'checkbox';
  checkBox.name = 'todo';
  inputSymbol.className = 'fas fa-times'
  userMessage.appendChild(document.createTextNode(inputValue));
  userInput.appendChild(checkBox);
  userInput.appendChild(userMessage);
  userInput.appendChild(inputSymbol);
  todoListItems.appendChild(userInput);
  todoInput.value = '';
}

function showAlert(message, alert) {
  const messageDiv = document.createElement('span');
  messageDiv.className = `message-${alert}`;
  messageDiv.textContent = message;

  form.appendChild(messageDiv);

  setTimeout(function () {
    messageDiv.remove();
  }, 1000);
}

function removeTodoItem(e) {
  if (e.target.className == 'fas fa-times') {
    e.target.parentElement.remove();
    showAlert('Todo başarıyla silindi...', 'success');
    deleteFromLocalStorage(e.target.parentElement.textContent);
  }
}

function addTodoLocalStorage(inputValue) {
  let todos = getTodoFromLocalStorage();
  todos.push(inputValue);
  localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodoFromLocalStorage() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

function loadAllToDoToUI() {
  let todos;
  todos = getTodoFromLocalStorage();

  todos.forEach(function (todo) {
    addTodoUI(todo);
  })
}

function deleteFromLocalStorage(deleteTodo) {
  let todos = getTodoFromLocalStorage();
  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function clearAllToDos() {
  let todo = document.querySelectorAll(".todo");
  todo.forEach(function (item) {
    item.remove();
  });
  removeFromLocalStorage();

}

function removeFromLocalStorage() {
  if (localStorage.getItem("todos") !== null) {
    localStorage.removeItem("todos");
  }
}


function filterToDo(e) {
  debugger
  let todos = document.querySelectorAll('.userTodos');
  let filterTodos = e.target.value.toLowerCase();
  todos.forEach(function (listItems) {
    const text = filterTodos;
    if (listItems.textContent.toLocaleLowerCase().indexOf(text) < 0) {
      listItems.parentElement.setAttribute('style', 'display :none!important');
    } else {
      listItems.parentElement.setAttribute('style', 'display :block!important');
    }
  })
}