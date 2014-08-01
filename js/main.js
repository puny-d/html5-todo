(function(){
    var mainList = document.querySelector('.main-lists');

    function Todo(){
        this.form();
        this.toggleClass();
    }

    Todo.prototype.form = function() {
        var that = this;
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
                    that.calculates(1);
                    //empty input
                    document.getElementById("edit-input").value = "";
                }
            }
        });
    };

    Todo.prototype.toggleClass = function() {
        var that = this;
        document.addEventListener('click', function(e){
            if(e.target){
                switch(e.target.className){
                    case "todo-list":
                        e.target.className = "todo-list-checked";
                        that.calculates(-1);
                        break;
                    case "todo-list-checked":
                         e.target.className = "todo-list";
                        that.calculates(1);
                        break;
                    case "delete-icon":
                        if(e.target.nextSibling.className == "todo-list") {
                            that.calculates(-1);
                        }
                        mainList.removeChild(e.target.parentNode);
                        break;
                    case "check-all":
                        var todoList = document.getElementsByClassName("todo-list"),
                            todoLen = todoList.length;
                        that.calculates(-todoLen);
                        while(todoLen--){
                            todoList[todoLen].className = "todo-list-checked";
                        }
                        break;
                    case "delete-all":
                        var todoListChecked = document.getElementsByClassName("todo-list-checked"),
                            todoCheckedLen = todoListChecked.length;
                        while(todoCheckedLen--){
                            mainList.removeChild(todoListChecked[todoCheckedLen].parentNode);
                        }
                        break;
                }
            }
        });
    };

    Todo.prototype.calculates = function(e) {
        var numSpan = document.getElementById('num'),
            num = document.getElementById('num').innerHTML,
            num = parseInt(num);
            updateDom = function() {
                if(num >= 0) {
                    num += e;
                    numSpan.innerHTML = num;
                }else{
                    num = 0;
                }
        };
        updateDom();
    }


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
