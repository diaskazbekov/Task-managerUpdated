import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from "./tasks.component";
import { MineComponent } from "./mine/mine.component";
import { ImportantComponent } from "./important/important.component";
import { CompletedComponent } from "./completed/completed.component";
import { DeletedComponent } from "./deleted/deleted.component";
import { ResultsComponent } from "./results/results.component";

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        component: MineComponent
      },
      {
        path: 'important',
        component: ImportantComponent
      },
      {
        path: 'completed',
        component: CompletedComponent
      },
      {
        path: 'deleted',
        component: DeletedComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
