import { Component, Input, OnInit } from '@angular/core';
import { ITask } from "../../../shared/interfaces/task.interface";
import { EIcon } from "../../../shared/enums/icon.enum";
import { IResponseData, TasksService } from "../tasks.service";
import { ITag } from "../../../shared/interfaces/tag.interface";
import { IFilter } from "../../../shared/interfaces/filter.interface";
import { DndDragImageOffsetFunction, DndDropEvent } from "ngx-drag-drop";

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss'
})
export class CommonComponent implements OnInit {
  @Input() pageTitle: string = '';
  @Input() mine: boolean = false;
  @Input() important: boolean = false;
  @Input() completed: boolean = false;
  @Input() deleted: boolean = false;
  @Input() results: boolean = false;
  tasks: ITask[] = [];
  total: number = 0;
  limit: number = 10;
  protected readonly iconName = EIcon;
  operateModal: boolean = false;
  confirmModal: boolean = false;
  operatedItem: ITask | undefined = undefined;
  private filter: IFilter = {};

  constructor(private _tasksService: TasksService) {
  }

  ngOnInit(): void {
    const { mine, important, completed, deleted, results } = this;
    if (!results) this._tasksService.clearSearchValue.next('');
    this.filter = { mine, important, completed, deleted, results };
    this._tasksService.searchValue.subscribe((value: string): void => {
      if (this.results && value) {
        this.filter.searchValue = value;
        this.getTasks();
      }
    });
    this._tasksService.selectedTags.subscribe((ids: number[]): void => {
      this.filter.tagIds = ids;
      this.getTasks();
    });
    this._tasksService.newTask.subscribe((value: boolean): void => {
      if (value) {
        this.operateModal = value;
        this._tasksService.newTask.next(false);
      }
    });
    this.getTasks();
  }

  getTasks(): void {
    this._tasksService.getTasks(this.filter, this.limit).subscribe({
      next: (response: IResponseData): void => {
        this.tasks = response.data;
        this.total = response.total;
      }
    });
  }

  highlightText(text: string): string {
    if (!this.filter.searchValue) return text;
    const regex: RegExp = new RegExp(`(${this.filter.searchValue})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  clickItem(event: any, item: ITask): void {
    event.preventDefault();
    this.operatedItem = item;
    this.operateModal = true;
  }

  toggleCompleted(item: ITask): void {
    this.operatedItem = item;
    this.operate('complete');
  }

  selectTag(event: any, tag: ITag): void {
    event.preventDefault();
    const selected: number[] = this._tasksService.selectedTags.getValue();
    if (!selected.includes(tag.id)) {
      selected.push(tag.id);
      this._tasksService.selectedTags.next(selected);
    }
  }

  toggleDeleted(item: ITask): void {
    this.operatedItem = item;
    this.confirmModal = true;
  }

  operate(type: 'delete' | 'complete' = 'delete'): void {
    if (this.operatedItem) {
      if (type === 'delete') {
        this.operatedItem.deleted = !this.operatedItem.deleted;
      } else {
        this.operatedItem.completed = !this.operatedItem.completed;
      }
      this._tasksService.operateTask(this.operatedItem).subscribe({
        next: (): void => {
          this.operatedItem = undefined;
          this.operateModal = false;
          this.confirmModal = false;
          this.getTasks();
        }
      });
    }
  }

  loadMore(event: any): void {
    event.preventDefault();
    this.limit += 5;
    this.getTasks();
  }

  closeModal(): void {
    this.operatedItem = undefined;
    this.operateModal = false;
  }

  saved(): void {
    this.closeModal();
    this.getTasks();
  }

  onDragged(item: any): void {
    const index: number = this.tasks.indexOf(item);
    this.tasks.splice(index, 1);
  }

  onDrop(event: DndDropEvent): void {
    let index: number | undefined = event.index;
    if (typeof index === 'undefined') {
      index = this.tasks.length;
    }
    this.tasks.splice(index, 0, event.data);
  }

  setDragImageOffset: DndDragImageOffsetFunction = (event: DragEvent, dragImage: Element): { x: number, y: number } => {
    const { width } = dragImage.getBoundingClientRect();
    const { height: y } = (event.target as HTMLElement).getBoundingClientRect();
    return { x: width - 30, y };
  };
}
