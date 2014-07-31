(function(){
    var mainList = document.querySelector('.main-lists');

    function Todo(){
        this.form();
        this.toggleClass();
    }

    Todo.prototype.form = function() {
        window.addEventListener("keypress", function (event){
            var key = event.keyCode || event.which;
            if(key === 13){
                //get value
                var txt = document.getElementById("edit-input").value;
                if(txt.length>0) {
                    //append todo
                    var todoListWarp = creatElement('div', 'todo-list-wrap'),
                        todoList = creatElement('div', 'todo-list', txt),
                        deleteIcon = creatElement('span', 'delete-icon');
                    mainList.appendChild(todoListWarp);
                    todoListWarp.appendChild(deleteIcon);
                    todoListWarp.appendChild(todoList);
                    //empty input
                    document.getElementById("edit-input").value = "";
                }
            }
        });
    };

    Todo.prototype.toggleClass = function() {
        mainList.addEventListener('click', function(e){
            if(e.target){
                switch(e.target.className){
                    case "todo-list":
                        e.target.className = "todo-list-checked";
                        break;
                    case "todo-list-checked":
                         e.target.className = "todo-list";
                        break;
                    case "delete-icon":
                        mainList.removeChild(e.target.parentNode);
                }
            }
        });
    };


    function creatElement(tagName, className, innerTxt) {
        var ele = document.createElement(tagName);
        if(className) {
            ele.className = className;
        }
        if(innerTxt) {
            ele.innerHTML = innerTxt;
        }
        return ele;
    }

    var mytodo = new Todo();
})();
