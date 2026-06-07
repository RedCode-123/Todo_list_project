"use strict";
import "./style.css";
import 'core-js/stable'
import 'regenerator-runtime/runtime'

let projectTasks = [];

// <<CustomLogger>>
class CustomLogger {
    log(obj) {
        let isItem = obj instanceof Task;
        if (isItem) {
            console.table({
                id: obj.id,
                title: obj.title,
                description: obj.description,
                dueDate: obj.dueDate,
                priority: obj.priority,
                note: obj.note,
                checklist: obj.checklist.toString()
            });
        }
    }
}

// <<TaskClass>>
class Task {
    constructor({
        id,
        title,
        description,
        dueDate, // FECHA de vencimiento
        priority, // high, medium, low
        note,
        checklist // Lista
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.note = note;
        this.checklist = checklist;
    }
    deleteChecklistTask(index){
        let remove = this.checklist.splice(index, 1);
        return remove;
    }
}

// <<ViewerClass>>
class Viewer {
     #checklist=[];
     #cancelBtn = document.querySelector("dialog #cancel-btn");
     #createBtn = document.querySelector("dialog #create-btn");
     #checklistInput = document.querySelector("dialog #checklist-input");
     #checklistOutput = document.querySelector("dialog #checklist-output");

    #createObjectTask(){
        let title = document.querySelector("dialog #title");
        let description = document.querySelector("dialog #description");
        let date = document.querySelector("dialog #date");
        let priority  = document.querySelector("dialog #priority");
        let note = document.querySelector("dialog #note");

        let newTask = {
            id: projectTasks.length,
            title: title.value,
            description: description.value,
            dueDate: date.value,
            priority: priority.value,
            note: note.value,
            checklist:this.#checklist
        }

        // TODO Falta agregar una clase ProjectTasks que controle
        // la lista de Tasks
        projectTasks.push(newTask);
        console.log(projectTasks);

    }
    showItemModal(){
        const dialog = document.querySelector("dialog");
        // Mostramos el formulario para una nueva tarea "Task"
        dialog.showModal();

        // Este Código nos permite agregar items a la lista this.#checklist
        let checklistBtn = document.querySelector("dialog #checklist-btn");
        checklistBtn.addEventListener("click", this.#checklistAdd.bind(this));
        this.#checklistInput.addEventListener("keydown", (event) =>{
            // console.log(event.key);
            return event.key === "Enter" ? this.#checklistAdd() : undefined;
        });


        this.#createBtn.addEventListener("click", this.#createObjectTask.bind(this));
    }


    #printChecklist() {

        let tempHtmlList= this.#checklist.map((item, index) => `
        <input type="text" class="checklist-item-${index}" value="${item}" disabled/>
        <button class="del-checklist-task-${index}" type="button">x</button>
        <button class="edit-checklist-task-${index}" type="button">E</button>
        <br>`);
        // console.log(tempHtmlList);
        this.#checklistOutput.innerHTML = tempHtmlList.join("");

        let allDelChecklistTask = document.querySelectorAll("button[class^='del-checklist-task-']");
        let allEditChecklistTask = document.querySelectorAll("button[class^='edit-checklist-task-']");
        let allChecklistItem = document.querySelectorAll("input[class^='checklist-item-']");

        allDelChecklistTask.forEach((delBtn, index) => {
                delBtn.addEventListener("click", ()=>{
                    this.#checklistDeletItem(this.#checklist, index);
                });
        })

        allEditChecklistTask.forEach((editBtn, index) => {
                editBtn.addEventListener("click", ()=>{
                    this.#checklistEditItem(this.#checklist, index);
                });
        })

        allChecklistItem.forEach((checklistItem, index) => {
                checklistItem.addEventListener("keydown", (event)=>{
                    if (event.key === "Enter") {
                        this.#checklistEditItem(this.#checklist, index);
                    }
                });
        })



    }

    #checklistEditItem(list, index) {
        let checklistItem = document.querySelector(`dialog .checklist-item-${index}`);
        checklistItem.disabled = !checklistItem.disabled;
        checklistItem.focus();
        list[index] = checklistItem.value;
        // console.log(this.#checklist);
    }

    #checklistAdd() {
        // console.log(checklistOutput);
        if (this.#checklistInput.value !== "") {
            // console.log(checklistInput.value);
            this.#checklist.push((this.#checklistInput.value))
            // console.log(this.#checklist);
            this.#checklistInput.value = "";
            this.#printChecklist()
        }
    }

    #checklistDeletItem(list, index) {
        list.splice(index,1);
        this.#printChecklist()
    }


    // <<createTaskHtml>>
    createTaskHtml(item){
        // TODO
    }
}


// Test Data ----------------------------------------------------
let taskData = {
    id: "001",
    title: "Finish the JavaScript proyect",
    description: "Make a todo project using HTML, CSS, JavaScript, npm, webpack and git",
    dueDate: "31/05/2026",
    priority: "high",
    note: "Curabitur lacinia pulvinar nibh.sdfsdfdsf dsfsf",
    checklist:["create project folder", "create html file", "create css file", "create js file"]
}

let task1 = new Task(taskData);
let logger = new CustomLogger();
// task1.deleteChecklistTask(1);
logger.log(task1);
let viewer = new Viewer;
viewer.showItemModal();
// ---------------------------------------------------------------
