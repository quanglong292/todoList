import { aTodo } from "./aTodo.js";
import { listTodo } from "./listTodo.js";
let list = new listTodo();
let listOfCompleted = new listTodo();


document.getElementById("addItem").addEventListener("click", () => {
    let newTask = document.getElementById("newTask").value;
    if (newTask !== '') {
        const toDo = new aTodo(newTask, "todo");
        list.addTodo(toDo);
    } else {
        alert ("You need to add some text!");
    };
    console.log(list);
    document.getElementById("todo").innerHTML = list.renderHtml();
    document.getElementById("newTask").value = "";
});

const deleteToDo = (event) => {
    let toDoIndex = event.currentTarget.getAttribute("data-index");
    let toDoStatus = event.currentTarget.getAttribute("data-status");
    
    if (toDoStatus == "todo") {
        list.delTodo(toDoIndex);
        document.getElementById("todo").innerHTML = list.renderHtml();
    } else if (toDoStatus == "completed") {
        listOfCompleted.delTodo(toDoIndex);
        document.getElementById("completed").innerHTML = listOfCompleted.renderHtml();
    } else {
        alert("Status isn't correct!");
    }
};
window.deleteToDo = deleteToDo;

const completeToDo = (event) => {
    let toDoIndex = event.currentTarget.getAttribute("data-index");
    let toDoStatus = event.currentTarget.getAttribute("data-status");
    
    if (toDoStatus == "todo") {
        const currentIndexVal = list.listTodo.slice(toDoIndex, parseFloat(toDoIndex)+1);
        const completedTodo = new aTodo (currentIndexVal[0].val, "completed");
        moveTodo(list, listOfCompleted, toDoIndex, completedTodo);
        
        document.getElementById("todo").innerHTML = list.renderHtml();
        document.getElementById("completed").innerHTML = listOfCompleted.renderHtml();
    } else if (toDoStatus == "completed") {
        const currentIndexVal = listOfCompleted.listTodo.slice(toDoIndex, toDoIndex+1);
        const toDo = new aTodo (currentIndexVal[0].val, "todo");
        moveTodo(listOfCompleted, list, toDoIndex, toDo);
        document.getElementById("completed").innerHTML = listOfCompleted.renderHtml();
        document.getElementById("todo").innerHTML = list.renderHtml();
    } else {
        console.log("Else statement case! Something not right");
    }
};
window.completeToDo = completeToDo;

const moveTodo = (departList, takingList, index, aNewTodo) => {
    departList.delTodo(index);
    takingList.addTodo(aNewTodo);
};



// MY IDEA
// document.getElementById("todo").innerHTML = list.renderHtml();

    // let newTask = document.getElementById("toDoVal").value;
    // let completedTodo = new aTodo(newTask, "completed")
    // listOfCompleted.addTodo(completedTodo);

    // document.getElementById("completed").innerHTML = listOfCompleted.renderHtml();

    // ("data-status");
    // if (toDoStatus == "completed") {
    //     toDoStatus = "todo"
    //     const toDo = new aTodo(newTask, toDoStatus);
    //     list.addTodo(toDo);
    //     listOfCompleted.listTodo.splice(toDoIndex, 2);
    //     document.getElementById("completed").innerHTML = listOfCompleted.renderHtml();
    //     document.getElementById("todo").innerHTML = list.renderHtml();
    // };

const sortAlphabet = () => {
   let listAfter = list.listTodo.sort( (a,b) => {
    let nameA = a.val.toUpperCase();
    let nameB = b.val.toUpperCase();
    if (nameA > nameB) {
        return -1;
    };
    if (nameB > nameA) {
        return 1;
    };
    return 0;
   });
   console.log(listAfter);
   document.getElementById("todo").innerHTML = listAfter.reduce((sumTag, item, index) => {
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
};
window.sortAlphabet = sortAlphabet;