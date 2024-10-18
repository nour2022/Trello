import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../Models/task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule,MatIconModule, CdkDropList, CdkDrag],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {

  tasks: Task[] = [];
  inprogress: Task[] = [];
  doneTasks: Task[] = [];
  isEnabled: boolean = false;
  todoForm: FormGroup;
updateIndex!:any;
  constructor(private fb: FormBuilder) {
    this.todoForm = new FormGroup({});
  }

  ngOnInit() {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  AddTask() {
    this.tasks.push({
      title : this.todoForm.value.item,
Completed : false,
description:" "

    });
    this.todoForm.reset();
  }
  UpdateTask() {
    this.tasks[this.updateIndex].title = this.todoForm.value.item;
    this.tasks[this.updateIndex].Completed = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEnabled = false;
  }
  OnUpdateTask(task:Task,id:number) { 
    this.todoForm.controls['item'].setValue(task.title);
    this.updateIndex = id;
    this.isEnabled=true;
    }
    deleteTask(id: number) {
    this.tasks.splice(id,1);
    }
    deleteInProgress(id: number) {
      this.inprogress.splice(id,1);
      }
      deleteDone(id: number) {
        this.doneTasks.splice(id,1);
        }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
