import { Component } from '@angular/core';
import { DropDown, DropDownContent, DropDownLabel } from '../drop-down/drop-down';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[app-header]',
  imports: [DropDown, DropDownLabel, DropDownContent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  // host: {
  //   "class": "sticky-top-0"
  // }
})
export class Header {
}
