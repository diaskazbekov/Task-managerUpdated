import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from "@angular/forms";
import { EIcon } from "../../../enums/icon.enum";
import { DatePipe } from "@angular/common";

interface IDate {
  date: number;
  month?: number;
  year?: number;
  weekend: boolean;
  current?: boolean;
  selected?: boolean;
  otherMonth?: boolean;
}

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.scss',
  providers: [DatePipe as any]
})
export class DateTimeComponent implements OnInit {
  @Input() form!: UntypedFormGroup;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
  protected readonly iconName = EIcon;
  protected opened: boolean = false;
  private _now: Date = new Date();
  private _selected: Date | undefined = undefined;
  protected hour: string = '00';
  protected minute: string = '00';
  protected current: { year: number, month: number, date: number, hour: number, minute: number } = {
    year: this._now.getFullYear(),
    month: this._now.getMonth() + 1,
    date: this._now.getDate(),
    hour: this._now.getHours(),
    minute: this._now.getMinutes()
  };
  protected readonly months: string[] = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  protected dates: Date[] = []

  constructor(private _datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.form.controls[this.controlName].valueChanges.subscribe((datetime: string): void => {
      if (datetime) {
        const valueArray: string[] = datetime.split(' ');
        const dateArray: string[] = valueArray[0].split('.');
        if (dateArray.length === 2) {
          if (dateArray[0].length === 1) {
            this.form.controls[this.controlName].setValue([`0${dateArray[0]}`, dateArray[1]].join('.'), { emitEvent: false });
          }
        }
        if (dateArray.length === 3) {
          if (dateArray[1].length === 1) {
            this.form.controls[this.controlName].setValue([dateArray[0], `0${dateArray[1]}`, dateArray[2]].join('.'), { emitEvent: false });
          }
        }
        if (valueArray.length === 2) {
          const timeArray: string[] = valueArray[1].split(':');
          if (timeArray.length === 2) {
            if (timeArray[0].length === 1) {
              this.form.controls[this.controlName].setValue([dateArray.join('.'), [`0${timeArray[0]}`, timeArray[1]].join(':')].join(' '), { emitEvent: false });
            }
          }
        }
      }
    });
  }

  onBlurDate(): void {
    if (this.form.controls[this.controlName].invalid) {
      const value: string = this.form.controls[this.controlName].value;
      const array: string[] = value.split(':');
      if (array.length === 2) {
        this.form.controls[this.controlName].setValue([array[0], `0${array[1]}`].join(':'), { emitEvent: false });
      }
    }
  }

  open(): void {
    this.opened = true;
    if (this.form.controls[this.controlName].valid) {
      const value: string = this.form.controls[this.controlName].value;
      const valueArray: string[] = value.split(' ');
      const dateArray: string[] = valueArray[0].split('.');
      const timeArray: string[] = valueArray[1].split(':');
      const year: number = Number(dateArray[2]);
      const month: number = Number(dateArray[1]);
      const date: number = Number(dateArray[0]);
      const hourStr: string = timeArray[0];
      const hour: number = Number(hourStr);
      const minuteStr: string = timeArray[1];
      const minute: number = Number(minuteStr);
      this.current.year = year;
      this.current.month = month;
      this.current.date = date;
      this.current.hour = hour;
      this.current.minute = minute;
      this._selected = new Date(year, month - 1, date, hour, minute);
      this.hour = hourStr;
      this.minute = minuteStr;
    }
    this.updateCalendar();
  }

  updateCalendar(): void {
    const dates: Date[] = [];
    const firstDate: Date = new Date(this.current.year, this.current.month - 1, 1);
    const lastDate: Date = new Date(this.current.year, this.current.month, 0);
    const previousDate: Date = new Date(firstDate);
    previousDate.setDate(firstDate.getDate() - 1);
    for (let day: number = previousDate.getDay(); day > 0; day--) {
      dates.unshift(new Date(previousDate));
      previousDate.setDate(previousDate.getDate() - 1);
    }
    const date: Date = new Date(firstDate);
    while (date <= lastDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    while (date.getDay() !== 1) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    this.dates = dates;
  }

  protected isGray(date: Date): boolean {
    if ([0, 6].includes(date.getDay())) return true;
    return date.getMonth() !== this.current.month - 1;
  }

  protected isSelected(date: Date): boolean {
    if (!this._selected) return false;
    return this._selected.getFullYear() === date.getFullYear() && this._selected.getMonth() === date.getMonth() && this._selected.getDate() === date.getDate();
  }

  protected isCurrent(date: Date): boolean {
    return this._now.getFullYear() === date.getFullYear() && this._now.getMonth() === date.getMonth() && this._now.getDate() === date.getDate();
  }

  switchMonth(next: boolean = true): void {
    if (this.current) {
      if (next) {
        if (this.current.month === 12) {
          this.current.month = 1;
          this.current.year++;
        } else {
          this.current.month++;
        }
      } else {
        if (this.current.month === 1) {
          this.current.month = 12;
          this.current.year--;
        } else {
          this.current.month--;
        }
      }
      this.updateCalendar();
    }
  }

  selectDate(item: Date): void {
    this._selected = new Date(item);
    this.onChangeTime();
  }

  onChangeTime(): void {
    if (this.hour && this.hour.length === 1) {
      if (Number(this.hour) > 2) {
        this.hour = '0' + this.hour;
      }
    }
    if (this.minute && this.minute.length === 1) {
      if (Number(this.minute) > 5) {
        this.minute = '0' + this.minute;
      }
    }
    if (this._selected) {
      this._selected.setHours(Number(this.hour));
      this._selected.setMinutes(Number(this.minute));
      this.form.controls[this.controlName].setValue(this._datePipe.transform(this._selected, 'dd.MM.yyyy HH:mm'));
    }
  }

  onBlurTime(): void {
    if (this.hour) {
      if (this.hour.length === 1) {
        this.hour = '0' + this.hour;
      }
    } else {
      this.hour = '00';
    }
    if (this.minute) {
      if (this.minute.length === 1) {
        this.minute = '0' + this.minute;
      }
    } else {
      this.minute = '00';
    }
  }
}
