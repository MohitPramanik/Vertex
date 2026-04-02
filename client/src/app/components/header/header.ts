import { Component, inject } from '@angular/core';
import { DropDown, DropDownContent, DropDownLabel } from '../drop-down/drop-down';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: '[app-header]',
  imports: [DropDown, DropDownLabel, DropDownContent, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
