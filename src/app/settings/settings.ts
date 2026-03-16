import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'section[settings-page]',
  imports: [RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  host: { class: 'max-w-[68rem] m-auto p-5' },
})
export class SettingsPage {}

