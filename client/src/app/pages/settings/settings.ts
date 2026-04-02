import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Table } from '../../components/table/table';

@Component({
  selector: 'div[app-general-settings]',
  imports: [],
  templateUrl: './general-settings.html',
  styleUrl: './settings.scss',
})

export class GeneralSettings {}

@Component({
  selector: 'div[app-security-settings]',
  imports: [Table],
  templateUrl: './security-settings.html',
  styleUrl: './settings.scss',
})

export class SecuritySettings {
  activeSessions = [
    {
      device: "Chrome/Windows",
      location: "Ranchi",
      lastActive: "5 minutes ago"
    },
    {
      device: "Mobile App",
      location: "Bangalore",
      lastActive: "1 hour ago"
    },
  ]
}

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {}
