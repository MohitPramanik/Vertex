import { Component } from '@angular/core';
import { DropDown, DropDownContent, DropDownLabel } from '../drop-down/drop-down';

@Component({
  selector: '[app-header]',
  imports: [DropDown, DropDownLabel, DropDownContent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  // host: {
  //   "class": "sticky-top-0"
  // }
})
export class Header {
}
