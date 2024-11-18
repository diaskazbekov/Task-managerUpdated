import { Component, OnInit } from '@angular/core';
import { EIcon } from "../../../shared/enums/icon.enum";
import { Router } from "@angular/router";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  protected readonly iconName = EIcon;
  protected value: string = '';

  constructor(
    private _tasksService: TasksService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._tasksService.clearSearchValue.subscribe((): void => {
      if (this.value) {
        this.value = '';
      }
    });
  }

  search(): void {
    if (this.value) {
      this._router.navigate(['results']).then();
      this._tasksService.searchValue.next(this.value);
    }
  }
}
