let addMessage = document.querySelector(".todo-input"),
    addButton = document.querySelector(".add"),
    todo = document.querySelector(".todos-wrapper");

let todoList = [];


if(localStorage.getItem("todo")){
    todoList = JSON.parse(localStorage.getItem("todo"));
    displayMessages();
}

        addButton.addEventListener("click", function(){
        if(!addMessage.value) return;
        let newTodo = {
            todo: addMessage.value,
            checked: false,
            important: false
        }
  
        todoList.push(newTodo);
        displayMessages();
        localStorage.setItem("todo", JSON.stringify(todoList));
        addMessage.value = '';
        });

    function displayMessages(){
        let displayMessage = "";
        if(todoList.length === 0) todo.innerHTML = "";
        todoList.forEach(function(item, i){
            displayMessage += `
            <li class="todo-item">
                <div class="container">
                    <div class="todo-checkbox">
                        <input class="checkbox__input" type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
                        <label for="item_${i}" class="${item.important ? "important" : " "} checkbox__label">${item.todo}</label>
                    </div>
                </div>
            </li>
            `;

            todo.innerHTML = displayMessage;
        })
    }  

    addMessage.addEventListener("keydown", (e) => {
      if(e.keyCode === 13) {
        addButton.click();
      }
   });

    todo.addEventListener("change", function(event){
        let idInput = event.target.getAttribute("id");
        let forLabel = todo.querySelector(("[for="+ idInput +"]"));
        let valueLabel = forLabel.innerHTML;

        todoList.forEach(function(item){
            if (item.todo === valueLabel){
                item.checked = !item.checked;
                localStorage.setItem("todo", JSON.stringify(todoList));
            }
        });

    });

    todo.addEventListener("contextmenu", function(event){
        event.preventDefault();
        todoList.forEach(function(item, i){
            if (item.todo === event.target.innerHTML){
                if(event.ctrlKey || event.metaKey){
                    todoList.splice(i, 1);
                } else {
                    item.important = !item.important;
                }
                displayMessages();
                localStorage.setItem("todo", JSON.stringify(todoList));
            }
        })
    });