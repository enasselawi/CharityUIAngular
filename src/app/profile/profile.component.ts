import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  userProfileForm: FormGroup = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    imagePath: ['']
  }); // Initialize userProfileForm with a default form group

  userId: number = 0;  // Initialize userId to a default value (0 or null)

  userData: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get user data from the token (assuming the token is stored in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userId; // Adjust to your JWT claim
    }

    // Fetch user profile details from backend
    this.fetchUserProfile();
  }

  // Fetch the user profile from the API
  fetchUserProfile() {
    if (this.userId) {
      this.authService.getUserProfile(this.userId).subscribe(
        (data) => {
          this.userData = data;
          this.userProfileForm.patchValue({
            fname: this.userData.Fname,
            lname: this.userData.Lname,
            email: this.userData.Email,
            password: this.userData.Password,
            imagePath: this.userData.ImagePath || '' // Default to empty if no image
          });
        },
        (error) => {
          this.toastr.error('Error fetching user profile');
          console.error(error);
        }
      );
    }
  }

  // Submit the form to update the user profile
  updateUserProfile() {
    if (this.userProfileForm.invalid) {
      this.toastr.error('Please fill in all required fields');
      return;
    }

    this.authService.updateUserProfile(this.userId, this.userProfileForm.value).subscribe(
      (response) => {
        this.toastr.success('Profile updated successfully');
        this.router.navigate(['/home']); // Redirect after successful update
      },
      (error) => {
        this.toastr.error('Error updating profile');
        console.error(error);
      }
    );
  }
















}
