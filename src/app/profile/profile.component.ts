import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../Services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  userId: number;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
 //fromlocal storage
     this.userId = +localStorage.getItem('userId')!;
    
   
     this.profileForm = this.fb.group({
       userid: [this.userId],
       fname: ['', Validators.required],
       lname: ['', Validators.required],
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required],
       imagepath: ['']
     });
   
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }
 loadUserProfile(): void {
  this.userService.getUserProfile(this.userId).subscribe(
    (data) => {
      this.profileForm.patchValue(data);
    },
    (error) => {
      this.toastr.error('Error loading profile data');
      console.error(error);
    }
  );
}

 onUpdateProfile(): void {
  if (this.profileForm.valid) {
    debugger;
    this.userService.updateUserProfile(this.userId, this.profileForm.value).subscribe(
      () => {
        this.toastr.success('Profile updated successfully');
      },
      (error) => {
        this.toastr.error('Error updating profile');
        console.error(error);
      }
    );
  } else {
    this.toastr.error('Please fill all required fields');
  }
}

  

 
}