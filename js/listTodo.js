export class listTodo {
    constructor () {
        this.listTodo = [];
    }

    addTodo (todo) {
        this.listTodo = [...this.listTodo, todo];
    }



    delTodo (index) {
        this.listTodo.splice(index, 1);
    }

    renderHtml () {
        let content = "";
        content = this.listTodo.reduce((sumTag, item, index) => {
            sumTag += `
            <li>
                <span id="toDoVal">${item.val}</span>
                <div class="buttons">
                    <button class="remove" data-index="${index}" data-status="${item.status}" onclick="deleteToDo(event)" id="changeStatus">
                    <i class="fa fa-trash-alt"></i>
                    </button>
                    <button class="complete" data-index="${index}" data-status="${item.status}"    onclick="completeToDo(event)" >
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                    </button>
                </div>
            </li>
            `;
            return sumTag;
        }, "");
        return content;
    }
}