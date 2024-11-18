import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { EIcon } from "../../enums/icon.enum";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalTitle: string | undefined = undefined;
  @Input() position: 'right' | 'center' = 'center';
  @Input() closeClickOutside: boolean = true;
  @Input() actionsTemplate: TemplateRef<any> | undefined = undefined;
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  protected readonly iconName = EIcon;

  ngOnInit(): void {
    document.body.classList.add('overflow-y-hidden');
  }

  clickOutside(): void {
    if (this.closeClickOutside) {
      this.onClose.emit();
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-y-hidden');
  }
}
