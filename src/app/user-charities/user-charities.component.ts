import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-user-charities',
  templateUrl: './user-charities.component.html',
  styleUrls: ['./user-charities.component.css']
})
export class UserCharitiesComponent implements OnInit{
  charities: any[] = [];
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.authService.getCharitiesByUserId(userId).subscribe(
        (data) => {
          this.charities = data;
          console.log('User charities:', this.charities);
        },
        (error) => {
          console.error('Error fetching charities:', error);
        }
      );
    }
  }

}
