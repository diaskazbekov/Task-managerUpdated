import { Injectable } from '@angular/core';
import { LocalStorageService } from "../../shared/services/local-storage.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ITag } from "../../shared/interfaces/tag.interface";
import { ELocalStorageKey } from "../../shared/enums/local-storage-key.enum";
import { ITask } from "../../shared/interfaces/task.interface";
import { IFilter } from "../../shared/interfaces/filter.interface";

export interface IResponseData {
  data: ITask[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  public searchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public clearSearchValue: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public newTask: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public tags: BehaviorSubject<ITag[]> = new BehaviorSubject<ITag[]>([]);
  public selectedTags: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(private localStorageService: LocalStorageService) {
  }

  getTags(): Observable<ITag[]> {
    const tags: ITag[] = this._getTagsFromLocalStorage();
    return of(tags);
  }

  getTasks(filter: IFilter, limit: number): Observable<IResponseData> {
    const tags: ITag[] = this._getTagsFromLocalStorage();
    let tasks: ITask[] = this._getTasksFromLocalStorage()
      .sort((a: ITask, b: ITask): number => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
      });
    const {
      results,
      searchValue,
      mine,
      important,
      completed,
      deleted,
      tagIds
    } = filter;
    if (results) {
      tasks = tasks.filter((task: ITask) => task.name.toLowerCase().includes((searchValue ?? '').toLowerCase()));
    } else {
      if (mine) {
        tasks = tasks.filter((task: ITask) => !task.deleted && !task.completed);
      }
      if (important) {
        tasks = tasks.filter((task: ITask) => !!task.important && !task.deleted && !task.completed);
      }
      if (completed) {
        tasks = tasks.filter((task: ITask) => !!task.completed && !task.deleted);
      }
      if (deleted) {
        tasks = tasks.filter((task: ITask) => !!task.deleted);
      }
    }
    if (tagIds?.length) {
      tasks = tasks.filter((task: ITask) => this._hasCommonTag(tagIds || [], task.tagIds || []));
    }
    tasks = tasks.map((task: ITask) => {
      if (task.tagIds?.length) {
        task.tags = tags.filter((tag: ITag) => task.tagIds!.includes(tag.id));
      }
      return task;
    });
    return of({ data: tasks.slice(0, limit), total: tasks.length });
  }

  operateTask(operatedTask: ITask): Observable<ITask> {
    let tasks: ITask[] = this._getTasksFromLocalStorage();
    delete operatedTask.tags;
    if (operatedTask.id) {
      tasks = tasks.map((task: ITask): ITask => (task.id === operatedTask.id ? operatedTask : task));
    } else {
      operatedTask.id = (tasks.length ? Math.max(...tasks.map((task: ITask) => task.id)) : 0) + 1;
      tasks.push(operatedTask);
    }
    this._setTasksToLocalStorage(tasks);
    return of(operatedTask);
  }

  private _getTagsFromLocalStorage(): ITag[] {
    return this.localStorageService.getItem<ITag[]>(ELocalStorageKey.TAGS) || [];
  }

  private _getTasksFromLocalStorage(): ITask[] {
    return this.localStorageService.getItem<ITask[]>(ELocalStorageKey.TASKS) || [];
  }

  private _setTasksToLocalStorage(tasks: ITask[]): void {
    this.localStorageService.setItem(ELocalStorageKey.TASKS, tasks);
  }

  private _hasCommonTag(arr1: number[], arr2: number[]): boolean {
    const set1: Set<number> = new Set(arr1);
    return arr2.some((id: number) => set1.has(id));
  }
}
