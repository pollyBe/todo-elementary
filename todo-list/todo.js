let todos = getTodoFromStorage();

document.addEventListener("DOMContentLoaded", () => {
  todos.forEach((todo) => {
    createTask(todo);
  });
});

let idCounter = 0;


// structure
const root = document.getElementById('root');

const container = document.createElement('div');
container.className = 'container';
root.append(container);

const header = document.createElement('div');
header.className = 'inputArea';
container.append(header);

// create button func

function createButton(text, className) {
  const button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = text;
  button.className = className;
  return button;
}

//delete btn

const deleteBtn = createButton('Delete All', 'deleteBtn');
deleteBtn.id = "deleteBtn";
header.append(deleteBtn);

deleteBtn.addEventListener("click", () => {
  todos = []; //
  setTodoInStorage(todos); // []
  //   localStorage.clear();
  document.getElementById("todoWrap").innerHTML = "";
});

// create input

const input = document.createElement('input');
input.type = 'text';
input.value = 'Enter TODO ..';
input.id = 'textField';
header.append(input);

input.addEventListener("focus", () => (input.value = ''));

// add btn

const addBtn = createButton('Add', 'addBtn');
addBtn.id = 'addTask';
header.append(addBtn);
addTask.addEventListener('click', addTodo);

// task list

const taskList = document.createElement('ul');
taskList.id = 'todoWrap';

container.append(taskList);

// add todoFunc

function addTodo() {
  
  const card = {
      id: idCounter++,
      text: input.value,
      date: new Date().toLocaleDateString("ru-Ru"),
      isChecked: false,
  };
    createTask(card);
    todos.push(card);
    setTodoInStorage(todos);
    input.value = 'Enter TODO ..';
}

// storage

function setTodoInStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodoFromStorage() {
  if (localStorage.getItem("todos")) {
    return JSON.parse(localStorage.getItem("todos"));
  }
  return [];
}

// create task func

function createTask (card) {
  const taskName = input.value;
  if (taskName !== '') {
    const listItem = document.createElement('li');
    listItem.className = 'listItem';
    taskList.append(listItem);

    const checkbox = document.createElement('div');
    checkbox.classList = 'checkWrap';
    listItem.append(checkbox);

    const check = document.createElement('button');
    check.type = 'button';
    check.className = 'checkbtn';
    check.checked = card.isChecked;
    checkbox.append(check);

    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa-solid fa-check';
    
    check.addEventListener('click', () => {
      if (!check.contains(checkIcon)) {
        check.append(checkIcon);
        taskNameText.style.textDecoration = 'line-through';
        listItem.style.backgroundColor = 'rgb(117, 85, 85)';
        card.isChecked = true;
    
      } else if (check.contains(checkIcon)) {
        checkIcon.remove();
        taskNameText.style.textDecoration = 'none';
        listItem.style.backgroundColor = '';
        card.isChecked = false;
        
      }
      setTodoInStorage(todos);
    })

    const taskNameWrap = document.createElement('div');
    taskNameWrap.className = 'taskName';
    listItem.append(taskNameWrap);

    const taskNameText = document.createElement('p');
    const pText = document.createTextNode(card.text);
    taskNameText.className = 'taskText';
    taskNameText.append(pText);
    taskNameWrap.append(taskNameText);

    const removeBtn = createButton('x', 'removeBtn');
    removeBtn.id = 'close';

    const btnWrap = document.createElement('div');
    btnWrap.className = 'btnWrap';
    listItem.append(btnWrap);
    btnWrap.append(removeBtn);

    removeBtn.addEventListener("click", (e) => {
      if (e.target.className === "removeBtn") {
        e.target.closest('.listItem').remove();
      }
    const filter = todos.filter((todo) => todo.id !== card.id);
    setTodoInStorage(filter);
    });

    const pDate = document.createElement('p');
    const dateText = document.createTextNode(card.date);
    pDate.append(dateText);
    
    const dateWrap = document.createElement('div');
    dateWrap.className = 'dateWrap';
    dateWrap.append(pDate);

    const right = document.createElement('div');
    right.className = 'right';
    listItem.append(right);
    right.append(btnWrap, dateWrap);
  }
}
console.log(todos)
