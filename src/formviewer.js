"use strict";
import {projectTasks, Task, ChecklistItem} from './main.js';
import deleteImg from "./media/delete.svg";
import editImg from "./media/edit.svg";
import checkImg from "./media/check.svg";


export class FormViewer {
    // <<FormViewer>>
     #checklist;
     #closeBtn = document.querySelector(".dialog-task #close-btn-sec > #close-btn");
     #cancelBtn = document.querySelector(".dialog-task>.task-form #cancel-btn");
     #createBtn = document.querySelector(".dialog-task >.task-form #create-btn");
    #editBtn = document.querySelector(".dialog-task >.task-form #edit-btn");
    #gotoEditBtn = document.querySelector(".dialog-task >.task-form #goto-edit-btn")
     #checklistInput = document.querySelector(".dialog-task >.task-form #checklist-input");
     #checklistOutput = document.querySelector(".dialog-task >.task-form #checklist-output");
     #dialog = document.querySelector(".dialog-task");
     #title = document.querySelector(".dialog-task >.task-form #title");
     #description = document.querySelector("dialog #description");
     #dueDate = document.querySelector(".dialog-task >.task-form #date");
     #priority  = document.querySelector(".dialog-task >.task-form #priority");
     #note = document.querySelector(".dialog-task >.task-form #note");
     #id;
    #formTitle = document.querySelector("dialog>form>fieldset>legend");

    constructor() {
        this.#id = projectTasks.length;
        this.#title.value = "";
        this.#description.value = "";
        const todayDate = new Date();
        let year = todayDate.getFullYear();
        let month = (todayDate.getMonth()+1)<10
                    ? `0${todayDate.getMonth()+1}`
                    : todayDate.getMonth()+1;
        let day = todayDate.getDate();
        console.log(`${day}-${month}-${year}`);
        this.#dueDate.value = `${year}-${month}-${day}`;
        // this.#dueDate.value = todayDate.toISOString().slice(0,10);
        this.#priority.value = "medium";
        this.#note.value = "";
        this.#checklistInput.value = "";
        this.#checklistOutput.value= "";
        this.#checklist=[];
    }

    #createObjectTask(){
        // Este método devuelve un objeto con los datos del fórumlario
        let newTask = {
            id: this.#id,
            title: this.#title.value,
            description: this.#description.value,
            dueDate: this.#dueDate.value,
            priority: this.#priority.value,
            note: this.#note.value,
            checklist: this.#checklist

        };

        // TODO Falta agregar una clase ProjectTasks que controle
        // la lista de Tasks
        projectTasks.push(newTask);
        // console.log(projectTasks);
        this.closeTaskModal();

    }
    closeTaskModal() {
        // <<closeTaskModal>>
        this.#dialog.close();
    }

    showCreateTask() {
    // <<showCreateTask>>
        this.#disableFormInputs(false);
        // Mostramos el formulario para una nueva tarea "Task"
        this.#dialog.showModal();
        this.#formTitle.innerText = "Creating Task";

        // Mostramos el botón "Crear" y oculta el botón de editar
        this.#currentBtn("create");

        // Este Código nos permite agregar items a la lista this.#checklist
        let checklistBtn = document.querySelector("dialog #checklist-btn");
        checklistBtn.addEventListener("click", this.#checklistAdd.bind(this));
        this.#checklistInput.addEventListener("keydown", (event) =>{
            // console.log(event.key);
            return event.key === "Enter" ? this.#checklistAdd() : undefined;
        });


        this.#createBtn.addEventListener("click", this.#createObjectTask.bind(this));
        this.#cancelBtn.addEventListener("click", this.closeTaskModal.bind(this));
        this.#closeBtn.addEventListener("click", this.closeTaskModal.bind(this));
    }


    #printChecklist(edit=true) {
        // Muestra los item del checklist
        // la variable edit es buleana y permite editar o no los valores
        if (edit) {
            let tempHtmlList= this.#checklist.map((item, index) => {
                let checklistItemDoneClass = item.done ? 'checklist-item-done' :'';
                return  `
                <span>
                <input type="text"  class="checklist-item-${index} ${checklistItemDoneClass}" value="${item.text}" disabled/>
                <button class="del-checklist-task-${index}" type="button">
                        <img src="${deleteImg}" alt="Close button" />
                </button>
                <button class="edit-checklist-task-${index}" type="button">
                        <img src="${editImg}" alt="Close button" />
                </button>
                <button class="mark-checklist-task-${index}" type="button">
                        <img src="${checkImg}" alt="Close button" />
                </button>
                </span>
                <br>`;
            });

            this.#checklistOutput.innerHTML = tempHtmlList.join("");
            // this.#checklistOutput.innerHTML ="";
            // this.#checklist.forEach((item, index) => {
            //     let checklistItemDoneClass = item.done ? 'checklist-item-done' :'';
            //     let html = `<span>
            //         <input type="text"  class="checklist-item-${index} ${checklistItemDoneClass}" value="${item.text}" disabled/>
            //         <button class="del-checklist-task-${index}" type="button">X</button>
            //         <button class="edit-checklist-task-${index}" type="button">E</button>
            //         <button class="mark-checklist-task-${index}" type="button">M</button>
            //         </span>`;
            //     this.#checklistOutput.insertAdjacentHTML("afterbegin", html);
            // })

            let allDelChecklistTask = document.querySelectorAll("button[class^='del-checklist-task-']");
            let allEditChecklistTask = document.querySelectorAll("button[class^='edit-checklist-task-']");
            let allChecklistItem = document.querySelectorAll("input[class^='checklist-item-']");
            let allMarkChecklistItem = document.querySelectorAll("button[class^='mark-checklist-task-']");

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

            allMarkChecklistItem.forEach((markBtn, index) => {
                    markBtn.addEventListener("click", ()=>{
                        if (!this.#checklist[index].done) {
                            // allChecklistItem[index].style.textDecoration="line-through";
                            allChecklistItem[index].classList.add("checklist-item-done");
                            this.#checklist[index].done = true;

                        } else {
                            allChecklistItem[index].classList.remove("checklist-item-done");
                            this.#checklist[index].done = false;

                        }
                    });
            })

        } else {
            let tempHtmlList= this.#checklist.map((item, index) =>{
                let checklistItemDoneClass = item.done ? 'checklist-item-done' :'';
                return `
                <span>
                <input type="text" class="checklist-item-${index} ${checklistItemDoneClass}" value="${item.text}" disabled/>
                </span>
                <br>`;
            });
            // console.log(tempHtmlList);
            this.#checklistOutput.innerHTML = tempHtmlList.join("");

        }

    }

    #checklistEditItem(list, index) {
        let checklistItem = document.querySelector(`.dialog-task>.task-form .checklist-item-${index}`);
        checklistItem.disabled = !checklistItem.disabled;
        checklistItem.focus();
        list[index].text = checklistItem.value;
        // console.log(this.#checklist);
    }

    #checklistAdd() {
        // console.log(checklistOutput);
        if (this.#checklistInput.value !== "") {
            // console.log(checklistInput.value);
            let checklistItem = new ChecklistItem(this.#checklistInput.value);
            // console.log(checklistItem)
            this.#checklist.push(checklistItem);
            this.#checklistInput.value = "";
            this.#printChecklist()
        }
    }

    #checklistDeletItem(list, index) {
        list.splice(index,1);
        this.#printChecklist()
    }

    #editObjectTask(){

        let newTask = {
            id: this.#id,
            title: this.#title.value,
            description: this.#description.value,
            dueDate: this.#dueDate.value,
            priority: this.#priority.value,
            note: this.#note.value,
            checklist: this.#checklist
        };

        projectTasks.splice(newTask.id, 1, newTask);
        // console.log(projectTasks);
        this.closeTaskModal();
        this.#createBtn.style.display ="inline";
        this.#editBtn.style.display ="none";

    }

    #fillFormWithTaskData(obj, formTitle) {
        // Esta función rellena el formulario con los datos del objeto (Obj)
        // que debe ser una instancia de Task
        // formTitle es el título del formulario
       if (obj instanceof Task) {
           this.#formTitle.innerText = formTitle;
           this.#id = obj.id;
           this.#title.value = obj.title;
           this.#description.value = obj.description;
           this.#dueDate.value = obj.dueDate;
           this.#priority.value = obj.priority;
           this.#note.value = obj.note;
           this.#checklist = obj.checklist;
           this.#printChecklist();
       }
    }

    showEditTask(obj){
        // <<showEditTask>>
        this.#disableFormInputs(false);
           this.showCreateTask();
           this.#fillFormWithTaskData(obj,"Editing Task");
           // Ocultamos el botón de "Crear" y mostramos el botón para editar

            this.#currentBtn("edit");

           this.#editBtn.addEventListener("click",this.#editObjectTask.bind(this));

    }

    #currentBtn(btn) {
    // Muestra solo el botón que es necesario
        if (btn === "show") {
            this.#createBtn.style.display ="none";
            this.#editBtn.style.display ="none";
            this.#gotoEditBtn.style.display = "inline"
        } else if(btn === "edit") {
           this.#createBtn.style.display ="none";
           this.#editBtn.style.display ="inline";
            this.#gotoEditBtn.style.display = "none"

        } else if(btn === "create") {
            this.#createBtn.style.display ="inline";
            this.#editBtn.style.display ="none";
            this.#gotoEditBtn.style.display = "none"

        }
    }

    #disableFormInputs(bool=false){
        // Habilita o deshabilita los campos del formulario
        // bool = true/false
        this.#title.disabled=bool;
        this.#description.disabled=bool;
        this.#dueDate.disabled=bool;
        this.#priority.disabled=bool;
        this.#note.disabled=bool;
        this.#checklistInput.disabled=bool;
    }

    showTask(obj) {
        //<<showTask>>
        this.showCreateTask();
        this.#fillFormWithTaskData(obj,"Showing Task");
        this.#currentBtn("show");

        this.#gotoEditBtn.addEventListener("click", () => {
            this.showEditTask(obj)
        })
        this.#disableFormInputs(true);
        this.#printChecklist(false);
    }

}
