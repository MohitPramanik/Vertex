import { Component, input } from "@angular/core";

@Component({
  selector: 'div.app-dashboard-card',
  imports: [],
  templateUrl: "./dashboard-card.html",
  styleUrl: './dashboard.scss',
})

export class DashboardCard {
  title = input<string>("Card Title");
  subTitle = input<string>('');
}