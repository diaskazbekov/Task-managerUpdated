import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { MineComponent } from './mine/mine.component';
import { SearchComponent } from './search/search.component';
import { ImportantComponent } from './important/important.component';
import { CompletedComponent } from './completed/completed.component';
import { DeletedComponent } from './deleted/deleted.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from "../../shared/shared.module";
import { MenuComponent } from './sidebar/menu/menu.component';
import { TagsComponent } from './sidebar/tags/tags.component';
import { CommonComponent } from './common/common.component';
import { OperateTaskComponent } from './common/operate-task/operate-task.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResultsComponent } from './results/results.component';
import {
  DndDraggableDirective,
  DndDropzoneDirective,
  DndHandleDirective,
  DndPlaceholderRefDirective
} from "ngx-drag-drop";

@NgModule({
  declarations: [
    TasksComponent,
    MineComponent,
    SearchComponent,
    ImportantComponent,
    CompletedComponent,
    DeletedComponent,
    SidebarComponent,
    MenuComponent,
    TagsComponent,
    CommonComponent,
    OperateTaskComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DndDropzoneDirective,
    DndPlaceholderRefDirective,
    DndDraggableDirective,
    DndHandleDirective,
    TasksRoutingModule
  ]
})
export class TasksModule {
}
