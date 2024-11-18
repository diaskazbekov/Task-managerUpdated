import { AbstractControl } from '@angular/forms';

interface IResponse {
  invalidDateTime: boolean;
}

export function datetimeValidator(control: AbstractControl): IResponse | null {
  const value = control.value;
  const regex: RegExp = /^([0-2]\d|3[0-1])\.(0\d|1[0-2])\.(19\d\d|20\d\d) ([0-1]\d|2[0-3]):[0-5]\d$/;


  if (!value || !regex.test(value)) {
    return { invalidDateTime: true };
  }

  const [day, month, year, hour, minute] = value.split(/\.|:|\s/).map(Number);

  if (!isValidDay(day, month, year)) {
    return { invalidDateTime: true };
  }

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return { invalidDateTime: true };
  }

  return null;
}

function isValidDay(day: number, month: number, year: number): boolean {
  const daysInMonth: number[] = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
  ];

  if (month === 2 && isLeapYear(year)) {
    daysInMonth[1] = 29;
  }

  return day >= 1 && day <= daysInMonth[month - 1];
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
