import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn = false;
  constructor(private authService: AuthService) {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in
  }

  logout() {
    this.authService.logout(); // Call logout from AuthService
    this.isLoggedIn = false;
  }
}
