import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: "dropdown-label",
  template: `<ng-content></ng-content>`
})

export class DropDownLabel { }

@Component({
  selector: "dropdown-content",
  template: `<ng-content></ng-content>`,
})

export class DropDownContent {
}


@Component({
  selector: 'dropdown',
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DropDown { }
