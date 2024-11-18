import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITag } from "../../../../shared/interfaces/tag.interface";
import { ITask } from "../../../../shared/interfaces/task.interface";
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { requiredValidator } from "../../../../shared/validators/required.validator";
import { TasksService } from "../../tasks.service";
import { datetimeValidator } from "../../../../shared/validators/datetime.validator";

@Component({
  selector: 'app-operate-task',
  templateUrl: './operate-task.component.html',
  styleUrl: './operate-task.component.scss'
})
export class OperateTaskComponent implements OnInit {
  @Input() task: ITask | undefined = undefined;
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  tags: ITag[] = [];
  protected form!: UntypedFormGroup;
  protected buttonText: string = "Добавить";
  protected selectedTags: number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _tasksService: TasksService
  ) {
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: ['', [requiredValidator]],
      date: ['', [Validators.required, datetimeValidator]],
      important: [false],
      description: ['']
    });
    if (this.task) {
      this.buttonText = 'Сохранить';
      this.form.patchValue(this.task);
      this.selectedTags = this.task.tagIds || [];
    }
    this.tags = this._tasksService.tags.getValue();
  }

  toggleImportant(checked: boolean): void {
    this.form.controls['important'].setValue(checked);
  }

  toggleTag(id: number, checked: boolean): void {
    if (checked) {
      this.selectedTags.push(id);
    } else {
      this.selectedTags = this.selectedTags.filter((item: number) => item !== id);
    }
  }

  operate(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((control: AbstractControl): void => {
        if (control.invalid) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else {
      const task: ITask = Object.assign(this.task ?? {}, this.form.getRawValue());
      task.tagIds = this.selectedTags;
      this._tasksService.operateTask(task).subscribe({
        next: () => this.saved.emit()
      })
    }
  }
}
