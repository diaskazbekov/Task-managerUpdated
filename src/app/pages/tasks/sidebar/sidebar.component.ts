import { Component } from '@angular/core';
import { ITag } from "../../../shared/interfaces/tag.interface";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  tags: ITag[] = [];
  constructor(protected tasksService: TasksService) {
  }
}
