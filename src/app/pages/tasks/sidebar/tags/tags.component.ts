import { Component, OnInit } from '@angular/core';
import { ITag } from "../../../../shared/interfaces/tag.interface";
import { TasksService } from "../../tasks.service";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit {
  tags: ITag[] = [];
  tagIds: number[] = [];

  constructor(private _tasksService: TasksService) {
  }

  ngOnInit(): void {
    this._tasksService.selectedTags.subscribe((ids: number[]) => this.tagIds = ids);
    this._tasksService.getTags().subscribe({
      next: (tags: ITag[]): void => {
        this._tasksService.tags.next(tags);
        this.tags = tags;
      }
    });
  }

  selectTag(event: any, item: ITag): void {
    event.preventDefault();
    if (this.tagIds.includes(item.id)) {
      this.tagIds = this.tagIds.filter((id: number): boolean => id !== item.id);
    } else {
      this.tagIds.push(item.id);
    }
    this._tasksService.selectedTags.next(this.tagIds);
  }
}
