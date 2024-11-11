import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router:Router ,private toastr:ToastrService,private auth:AuthService){}
  registerForm:FormGroup = new FormGroup({
    FName : new FormControl('First Name' , [Validators.required]),
    LName : new FormControl('Last Name' , [Validators.required]),
    email :new FormControl('ex@example.com',[Validators.required,Validators.email]), 
    password:new FormControl('********', [Validators.required,Validators.minLength(8)]),
    reapatPassword: new FormControl('********')
  })
 

  matchError(){
    if(this.registerForm.controls['password'].value ==
      this.registerForm.controls['reapatPassword'].value )
      this.registerForm.controls['reapatPassword'].setErrors(null)
      else 
      this.registerForm.controls['reapatPassword'].setErrors({misMatch:true})
  }
  
//register
submit() {
  if (this.registerForm.invalid) {
    this.toastr.error('Please fill out the form correctly.');
    return;
  }

  const user = {
    fname: this.registerForm.controls['FName'].value,
    lname: this.registerForm.controls['LName'].value,
    email: this.registerForm.controls['email'].value,
    password: this.registerForm.controls['password'].value,
  //  imagepath: 'default.jpg' // Assuming a default image path for now
  };

  this.auth.register(user).subscribe(
    (response) => {
      console.log(response);
      this.toastr.success('User registered successfully');
      this.router.navigate(['/security/login']);
    },
    (error) => {
      console.error(error);
      this.toastr.error('Registration failed. Please try again.');
    }
  );
}



















































}
