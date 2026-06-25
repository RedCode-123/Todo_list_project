"use strict";
import "./style.css";
import 'core-js/stable'
import 'regenerator-runtime/runtime'
export let projectTasks = [];
import {FormViewer} from './formviewer.js';


class CustomLogger {
// <<CustomLogger>>
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

export class ChecklistItem {
    // <<ChecklistItem>>
    constructor(text, done=false) {
        this.text = text;
        this.done = done;
    }
}

export class Task {
// <<Task>>
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
    deleteChecklistItem(index){
    // <<deleteChecklistItem>>
        let remove = this.checklist.splice(index, 1);
        return remove;
    }
}



// Test Data ----------------------------------------------------

let item1 = new ChecklistItem("create project folder", true)
let item2 = new ChecklistItem("create html file")
let item3 = new ChecklistItem("create css file", true)

let taskData = {
    id: "001",
    title: "Finish the JavaScript proyect",
    description: "Make a todo project using HTML, CSS, JavaScript, npm, webpack and git",
    dueDate: "2026-05-01",
    priority: "high",
    note: "Curabitur lacinia pulvinar nibh.sdfsdfdsf dsfsf",
    checklist:[ item1, item2, item3]
}

let task1 = new Task(taskData);
let logger = new CustomLogger();
// task1.deleteChecklistTask(1);
logger.log(task1);
let formViewer = new FormViewer;
/////////////////////////////////////
// formViewer.showCreateTask();
// formViewer.showEditTask(task1);
formViewer.showTask(task1);
// ---------------------------------------------------------------
