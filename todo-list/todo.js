const root = document.getElementById('root');

const container = document.createElement('div');
container.className = 'container';
root.append(container);

const header = document.createElement('div');
header.className = 'inputArea';
container.append(header);

function createButton(text, className) {
  const button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = text;
  button.className = className;
  return button;
}

const deleteBtn = createButton('Delete All', 'deleteBtn');
header.append(deleteBtn);

const deleteItems = () => {
  const items = document.querySelectorAll('.listItem');
  items.forEach(item => item.remove());
};

deleteBtn.addEventListener('click', deleteItems);

const input = document.createElement('input');
input.type = 'text';
input.value = 'Enter TODO ..';
input.id = 'taskInput';
header.append(input);

input.addEventListener("focus", () => (input.value = ''));

const addBtn = createButton('Add', 'addBtn');
header.append(addBtn);

const taskList = document.createElement('ul');
taskList.className = 'taskList';
container.append(taskList);

const now = new Date();
const dateTimeString = now.toLocaleString();


function createTask () {
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
    checkbox.append(check);

    const checkIcon = document.createElement('i');
    checkIcon.className = 'fa-solid fa-check';
    
    check.addEventListener('click', () => {
      check.append(checkIcon);
      taskNameText.style.textDecoration = 'line-through';
      listItem.style.backgroundColor = 'rgb(117, 85, 85)';
    })

    const taskNameWrap = document.createElement('div');
    taskNameWrap.className = 'taskName';
    listItem.append(taskNameWrap);

    const taskNameText = document.createElement('p');
    const pText = document.createTextNode(taskName);
    taskNameText.className = 'taskText';
    taskNameText.append(pText);
    taskNameWrap.append(taskNameText);

    const removeBtn = createButton('x', 'removeBtn');

    const btnWrap = document.createElement('div');
    btnWrap.className = 'btnWrap';
    listItem.append(btnWrap);
    btnWrap.append(removeBtn);

    const pDate = document.createElement('p');
    const dateText = document.createTextNode(dateTimeString);
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
addBtn.addEventListener('click', createTask);

const removeItem = (e) => {
  if (e.target.className === "removeBtn") {
    e.target.closest('.listItem').remove();
  }
  // if (e.target.className === "taskText") {
  //   input.value = e.target.outerText;
  //   addBtn.removeEventListener("click", createTask);
  //   addBtn.addEventListener("click", changeText(e.target));
  // }
};

taskList.addEventListener("click", removeItem);


// please, be gentle its my first time