import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {

  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
